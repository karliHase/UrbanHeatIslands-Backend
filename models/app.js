const axios = require("axios");
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "inno",
  password: "postgres", // Eigenes Password verwenden
  port: "5432",
});
client.connect();

Startup();
async function Startup() {
  var Stationen = await ConnectToDatabase();
  for (const item of Stationen) {
    var res = await ApiAbruf(item);
    if (res.status == 200) {
     
      await UpdateDatabase(res);
    }
  }
  console.log("Fertig");
}

async function ConnectToDatabase() {
  const res = await client.query("select station_id from station");
  var arrayspeicher = new Array(res.rows.length);
  for (let index = 0; index < res.rows.length; index++) {
    arrayspeicher[index] = res.rows[index].station_id;
  }
  return arrayspeicher;
}

async function ApiAbruf(ID) {
  try {
    const response = await axios.get(
      `http://api.weather.com/v2/pws/observations/current?apiKey=6532d6454b8aa370768e63d6ba5a832e&stationId=${ID.toUpperCase()}&format=json&units=m`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function UpdateDatabase(res) {
  try {
    var speed =0; (res.data.observations[0].metric.windSpeed == NaN) ? speed =0 : speed = res.data.observations[0].metric.windSpeed; 
    //var text = "update station set temp ="+parsed+" where station_id ='"+res.data.observations[0].stationID.toLowerCase()+"';";
    var text =
      "update station set temp =($1), windspeed=($2),lat=($3),lon=($4),pressure=($5),elevation=($6), neighborhood ='" +
      res.data.observations[0].neighborhood +
      "' where station_id ='" +
      res.data.observations[0].stationID +
      "';";
    var values = [
      parseInt(res.data.observations[0].metric.temp),
      speed,
      parseFloat(res.data.observations[0].lat),
      parseFloat(res.data.observations[0].lon),
      parseFloat(res.data.observations[0].metric.pressure),
      parseInt(res.data.observations[0].metric.elev)
    ];
    var response = await client.query(text, values);
    
  } catch (err) {
    console.log(err);
  }
}

async function GetLocation(bezik_id) {
  var text = "select * from station s join bezirk b on(s.station_id = b.station_id) where bezirk_id =($1);";
  var values = [parseInt(bezik_id)];
  var res = await client.query(text,values);
  return res.rows;
}

module.exports = {
  GetLocation,
};
