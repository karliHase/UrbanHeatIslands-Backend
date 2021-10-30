const axios = require('axios');
const { Client } = require('pg');
const express = require('express');
var app = express();
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'inno',
  password: '',
  port: '5432'
});
client.connect();
Startup();
async function Startup() {

  var Stationen = await ConnectToDatabase()
  for (const item of Stationen) {
    var res = await ApiAbruf(item);
    if (res.status == 200) {
      await UpdateDatabase(res);
    }

  }
  console.log("Fertig");

}

async function ConnectToDatabase() {

  const res = await client.query('select station_id from station');
  var arrayspeicher = new Array(res.rows.length);
  for (let index = 0; index < res.rows.length; index++) {
    arrayspeicher[index] = res.rows[index].station_id;
  }
  return arrayspeicher;
}

async function ApiAbruf(ID) {
  try {
    const response = await axios.get('http://api.weather.com/v2/pws/observations/current?apiKey=6532d6454b8aa370768e63d6ba5a832e&stationId=' + ID.toUpperCase() + '&format=json&units=m');
    return response;
  } catch (err) {
    console.log(err);
  }


}

async function UpdateDatabase(res) {
  try {
    //var text = "update station set temp ="+parsed+" where station_id ='"+res.data.observations[0].stationID.toLowerCase()+"';";
    var text = "update station set temp =($1), windspeed=($2), neighborhood ='" + res.data.observations[0].neighborhood + "' where station_id ='" + res.data.observations[0].stationID + "';";
    var values = [parseInt(res.data.observations[0].metric.temp), parseInt(res.data.observations[0].metric.windSpeed)];
    var response = await client.query(text, values);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function GetLocation(name) {
  var text ="select * from station where neighborhood='"+name+"';";
  var res = await client.query(text);
  return res.rows;
}

app.get('/Hietzing', async (req, res) => {
  var response = await GetLocation('Hietzing');
  res.send(response);

})

app.get('/Hernals', async (req, res) => {
  var response = await GetLocation('Hernals');
  res.send(response);

})
app.get('/Ottakring', async (req, res) => {
  var response = await GetLocation('Ottakring');
  res.send(response);

})
app.get('/Rudolfsheim-fuenfhaus', async (req, res) => {
  var response = await GetLocation('Rudolfsheim-Fünfhaus');
  res.send(response);

})

app.get('/Penzing', async (req, res) => {
  var response = await GetLocation('Penzing');
  res.send(response);

})
app.get('/Meidling', async (req, res) => {
  var response = await GetLocation('Meidling');
  res.send(response);

})
app.get('/Simmering', async (req, res) => {
  var response = await GetLocation('Simmering');
  res.send(response);

})
app.get('/Favoriten', async (req, res) => {
  var response = await GetLocation('Favoriten');
  res.send(response);

})
app.get('/Alsergrund', async (req, res) => {
  var response = await GetLocation('Alsergrund');
  res.send(response);

})
app.get('/Neubau', async (req, res) => {
  var response = await GetLocation('Neubau');
  res.send(response);

})
app.get('/Währing', async (req, res) => {
  var response = await GetLocation('Währing');
  res.send(response);

})
app.get('/Floridsdorf', async (req, res) => {
  var response = await GetLocation('Floridsdorf');
  res.send(response);

})
app.get('/Donaustadt', async (req, res) => {
  var response = await GetLocation('Donaustadt');
  res.send(response);

})
app.get('/Liesing', async (req, res) => {
  var response = await GetLocation('Liesing');
  res.send(response);

})
app.get('/Brigittenau', async (req, res) => {
  var response = await GetLocation('Brigittenau');
  res.send(response);

})
app.get('/Döbling', async (req, res) => {
  var response = await GetLocation('Döbling');
  res.send(response);

})
app.get('/Mariahilf', async (req, res) => {
  var response = await GetLocation('Mariahilf');
  res.send(response);

})
app.get('/Margareten', async (req, res) => {
  var response = await GetLocation('Margareten');
  res.send(response);

})
app.get('/Wieden', async (req, res) => {
  var response = await GetLocation('Wieden');
  res.send(response);

})
app.get('/Landstraße', async (req, res) => {
  var response = await GetLocation('Landstraße');
  res.send(response);

})
app.get('/Innere-Stadt', async (req, res) => {
  var response = await GetLocation('Innere Stadt');
  res.send(response);

})
var server = app.listen(7777, function () { })





