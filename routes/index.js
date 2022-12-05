var express = require("express");
var router = express.Router();
var myFunctions = require("../models/app");

const bad_request = {"ERR":"400 Bad Request"};
// Mit dieser Route/Funktion können Daten von bestimmten Bezirken oder von allen Bezirken abgerufen werden.
router.get("/getData/:bezirk", async (req, res) => {
  var response;
  // Wir überprüfen zu erst ob, wir eine richtige Bezirksnummer erhalten haben, wenn nicht schicken wird den statuscode von 400 zurück.
  if(req.params.bezirk > 23 || req.params.bezirk < 1)
  {
    
    res.send(bad_request);
    return;
  }
// Wenn wir all oder einer Zahl zwischen 1und 23 erhalten haben, rufen wir die Methode GetLocation auf und erhalten die Daten der Beirke
// Diese Daten senden wir dann dem Frontend zurück
  if(req.params.bezirk.toLowerCase() =="all")
  {
    response = await myFunctions.GetLocation("all");
    res.send(response);
    return;
  }
  
  response = await myFunctions.GetLocation(req.params.bezirk);
  if(response == undefined)
  {
    res.send(bad_request)
    return;
  }
  res.send(response);
});
// Bestimmte Daten von Bezirken abrufen
router.get("/getData/:bezirk/:info", async (req, res) => {
 //humidity
  var response;
  // Wir kontrollieren zuerst ob wir richtige Parameter bekommen haben
  // Wenn nciht antorten wir mit dem StatusCode 400
  //Ansosten Rufen wir die MEthode Durschnitt auf die uns die Daten zurück gibt.
  // Wir mussen noch am Ende kontrollieren ob diese Daten nicht leer sind, da mache stationen nicht alle Attribute Messen 
  // Deswegen könnte es sein dass in der Datenbank ein Null drinnen steht 
  if(req.params.info.toLowerCase() == "temp" || req.params.info.toLowerCase() == "pressure" || req.params.info.toLowerCase() == "windspeed" || req.params.info.toLowerCase() == "elevation"|| req.params.info.toLowerCase() == "humidity")
    {
        response = await myFunctions.Durchschnitt(req.params.bezirk,req.params.info.toLowerCase());
    }else
    {
      res.send(bad_request);
      return;
    }
    (response == undefined) ? response = bad_request: null;
    res.send(response);
});
// Daten von einer bestimmten Station zu bekommen
router.get("/getStation/:Stationid", async (req, res) => {
  var response = await myFunctions.getStation(req.params.Stationid);
  // Wemm wir als response keine Daten erhalten dann wurde die StationId falsch eingegeben und mit dem StatusCode 400 geantwortet
  (response.length == 0) ? response = bad_request : null;
  res.send(response);
});
// Bestimmte daten einer Station zu bekommen
// Funktioniert 1 zu 1 wie bei den Bezirken nur halt mit einer bestimmten Station 
router.get("/getStation/:Stationid/:info", async (req, res) => {
  var response;
    if(req.params.info.toLowerCase() == "temp" || req.params.info.toLowerCase() == "pressure" || req.params.info.toLowerCase() == "windspeed" || req.params.info.toLowerCase() == "elevation" || req.params.info.toLowerCase() == "humidity")
    {
        response = await myFunctions.getStationInformation(req.params.Stationid,req.params.info.toLowerCase());
    }else
    {
      res.send(bad_request);
      return;
    }
    (response == undefined) ? response = bad_request: null;
  res.send(response);
});
// Den Serverstatus zu bekommen ob er grad down ist oder nicht
router.get("/serverstatus", async (req, res) => {
  res.send("200");
  
});
// Um ein update der Datenbank zu forcen
router.get("/force", async (req, res) => {
  myFunctions.Force();
  res.send("200");
});

router.get("/getHistory", async (req,res) =>{
    var response = await myFunctions.getHistory();
    res.send(response)
})
router.get("/getHistory/:Stationid", async (req,res) =>{
  var response = await myFunctions.getHistoryStation(req.params.Stationid)
  response == "" ? response = bad_request : null
  res.send(response)
  
})
module.exports = router;
