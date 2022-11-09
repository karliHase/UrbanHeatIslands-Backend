const axios = require("axios");
const { Client } = require("pg");

// Die Connections zur Datenbank 
// ConnectionString
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "inno",
  password: "postgres", // Eigenes Password verwenden
  port: "5432",
});
// Die Verbindung zu Datenbank wird mit der Methode Connect aufgebaut
client.connect();

//Die Methode RefreshDatenbank, updatet die Daten der einzelnen Wetterstationen
RefreshDatenbank = async () => {
  console.log("Refreshing Datenbank");
  //Die MEthode ConnectToDatenbank gibt ein Array zurück mit jeder StationID die in der Datenbank gespeichert ist
  var Stationen = await ConnectToDatabase();
  for (const item of Stationen) {
    // Für jeder dieser IDs tun wir mit der Methode APIapruf die API abfragen
    var res = await ApiAbruf(item);
    // Wenn wir als StatusCode ein 200 zurück bekommen updatet wir die Informatioen der Stationen in der Datenbank
    if (res.status == 200) {
      await UpdateDatabase(res);
    }else{
      // Wenn wir aber einen anderen StatusCode als 200 bekommen, wissen wir dass, die Station grad nciht aktiv oder ausgefallen ist
      // Deswegen löschen wir die Information dieser Station aus der Datenbank um die Daten nicht zu verfältschen 
      await DeleteOldData(item);
    }
  }
  console.log("Refreshing beendet");
};
// Das ist die Methode die die von nicht aktiven Stationen die Daten aus der Datenbank löscht
// Dies machen wir mit einem einfachen update query wo wir alles auf null setzte außer die StationID
DeleteOldData = async (ID) =>{
  var text = "update station set temp = null,windspeed = 0,elevation = null, pressure = null, humidity = null, time = null where station_id = ($1)"
  var value = [ID.toUpperCase()]
  await client.query(text,value)
}

// Das ist die Methode mit der wir jede Station ID bekommen
// Mit einem einfachen Select von jeder Station bekommen wir die Station und speicher sie in ein Array und returnen es 
ConnectToDatabase = async () => {
  const res = await client.query("select station_id from station");
  var arrayspeicher = new Array(res.rows.length);
  for (let index = 0; index < res.rows.length; index++) {
    arrayspeicher[index] = res.rows[index].station_id;
  }
  return arrayspeicher;
};
//Das hier ist die API wenn sie die Daten als Integer haben wollen und nciht als Deciaml
// https://api.weather.com/v2/pws/observations/current?apiKey=6532d6454b8aa370768e63d6ba5a832e&stationId=${ID.toUpperCase()}&format=json&units=m

//Mit einem http abruf mit axios bekommen wir jede Information von einer Station und returnen diese
ApiAbruf = async (ID) => {
  try {
    const response = await axios.get(
      `https://api.weather.com/v2/pws/observations/current?apiKey=e1f10a1e78da46f5b10a1e78da96f525&stationId=${ID.toUpperCase()}&numericPrecision=decimal&format=json&units=m`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
//In dieser Methode Überprüfen wir die DAten und speicher sie in die Datenbank
UpdateDatabase = async (res) => {
  try {
    // Wir müssen als erstes bei jeder Station überprüfen ob wir auch Informationen bei jeder WErt bekommen haben
    // Wenn nicht dann speichern wir statt einer Zahl oder Textes einen null in die Datenbank somit wissen wir dass wir nicht bekommen haben 
    var speed = null;
    res.data.observations[0].metric.windSpeed == null
      ? null
      : (speed = parseFloat(res.data.observations[0].metric.windSpeed));
    var temp = null;
    res.data.observations[0].metric.temp == null
      ? null
      : (temp = parseFloat(res.data.observations[0].metric.temp));
    var lat = null;
    res.data.observations[0].lat == null
      ? null
      : (lat = parseFloat(res.data.observations[0].lat));
    var lon = null;
    res.data.observations[0].lon == null
      ? null
      : (lon = parseFloat(res.data.observations[0].lon));
    var pressure = null;
    res.data.observations[0].metric.pressure == null
      ? null
      : (pressure = parseFloat(res.data.observations[0].metric.pressure));
    var elev = null;
    res.data.observations[0].metric.elev == null
      ? null
      : (elev = parseFloat(res.data.observations[0].metric.elev));
    var humidity = null;
    res.data.observations[0].humidity == null
      ? null
      : (humidity = parseFloat(res.data.observations[0].humidity));
    var time = res.data.observations[0].obsTimeLocal;
    var text =
      "update station set temp =($1), windspeed=($2),lat=($3),lon=($4),pressure=($5),elevation=($6),humidity = ($7),time = ($8), neighborhood ='" +
      res.data.observations[0].neighborhood +
      "' where station_id ='" +
      res.data.observations[0].stationID +
      "';";
    var values = [temp, speed, lat, lon, pressure, elev,humidity,time];
    var response = await client.query(text, values);
  } catch (err) 
  {
    console.log(err);
  }
};

// Die Funktion ist dazu da um Daten von einem Bezirk abzurufen oder von jedem bezirk
GetLocation = async (bezirk_id) => {
  // Wir überprüfen zuerst ob wir den Text all bekommen haben
  // wenn nicht dann führen wir eine query aus die die Daten von jeder Station in einem Bezirk welches angegeben wurde zurück gibt
  if (bezirk_id == "all") 
  {
 
    var text = "select distinct * from station s where s.temp notnull;";
    var res = await client.query(text, values);
    return res.rows;
    // Wenn all eingebeben wurde wird jede Information von jeder Station zurück gegeben.
  } else if (bezirk_id > 0 && bezirk_id < 24)
  {
    var text =
    "select distinct * from station s join bezirk b on(s.station_id = b.station_id) where bezirk_id =($1) and s.temp notnull;";
  var values = [parseInt(bezirk_id)];
  var res = await client.query(text, values);
  return res.rows;
  }else
  {
    return undefined;
  }
};
// MIt dieser Funktionen bekommen wir Daten von einer Station 
getStation = async (Stationid) => {
  var text = `select distinct * from station where station_id='${Stationid}'`;
  var res = await client.query(text);
  return res.rows;
};
// Diese MEthode gibt den Durchschnitt von verschiedensten sachen zurück (Temepratur,Feuchtigkeit etc)
Durchschnitt = async (bezirk_id, getInfo) => {
  if (bezirk_id == "all") 
  {
    var text = `select AVG(${getInfo.toUpperCase()}) from station s where s.temp notnull`;
    var res = await client.query(text);
    return res.rows[0].avg;
    // Wir können das wieder Bezirks orientiert machen oder wieder all eingeben und den Durschnitt für alle Stationen ausrechnen 
  } else if(bezirk_id > 0 && bezirk_id < 24) 
  {
    var text = `select AVG(${getInfo.toUpperCase()}) from station s join bezirk b on(s.station_id = b.station_id) where bezirk_id =($1) and s.temp notnull`;
    var values = [parseInt(bezirk_id)];
    var res = await client.query(text, values);
    return res.rows[0].avg;
  }
  else
  {
    return undefined;
  }
};
// Mit getStationInformation können wir eine bestimmte Information von einer station abrufen Beispiel: Temperatur
getStationInformation = async (Stationid, getInfo) => {
  var text = `select ${getInfo} from station s where station_id ='${Stationid}'`;
  var res = await client.query(text);
  return res.rows[0];
};
// Ist dazudar um einen Refresh zu Forcen
Force = async () =>{
  await RefreshDatenbank();
}

// Updatet die Datenbank jede Stunde 
RefreshDatenbank();
setInterval(() => {
  RefreshDatenbank();
}, 1000 * 60 * 60);

module.exports = {
  GetLocation,
  Durchschnitt,
  getStation,
  getStationInformation,
  Force,
};
