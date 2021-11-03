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

// Startup();
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
    //var text = "update station set temp ="+parsed+" where station_id ='"+res.data.observations[0].stationID.toLowerCase()+"';";
    var text =
      "update station set temp =($1), windspeed=($2), neighborhood ='" +
      res.data.observations[0].neighborhood +
      "' where station_id ='" +
      res.data.observations[0].stationID +
      "';";
    var values = [
      parseInt(res.data.observations[0].metric.temp),
      parseInt(res.data.observations[0].metric.windSpeed),
    ];
    var response = await client.query(text, values);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function GetLocation(name) {
  var text = "select * from station where neighborhood='" + name + "';";
  var res = await client.query(text);
  return res.rows;
}

module.exports = {
  GetLocation,
};
