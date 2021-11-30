var express = require("express");
var router = express.Router();
const { GetLocation, Durchschnitt,getStation,getStationInformation } = require("../models/app");

router.get("/getData/:bezirk", async (req, res) => {
  var response;
  if(req.params.bezirk > 23 || req.params.bezirk < 1)
  {
    res.send("400");
    return;
  }

  if(req.params.bezirk.toLowerCase() =="all")
  {
    response = await GetLocation("all");
    res.send(response);
    return;
  }
  
  response = await GetLocation(req.params.bezirk);
  res.send(response);
});

router.get("/getData/:bezirk/:info", async (req, res) => {
 
  if(req.params.bezirk > 23 || req.params.bezirk < 1)
  {
    res.send("400");
    return;
  }
  var response;
  if(req.params.info.toLowerCase() == "temp" || req.params.info.toLowerCase() == "pressure" || req.params.info.toLowerCase() == "windspeed" || req.params.info.toLowerCase() == "elevation")
    {
        response = await Durchschnitt(req.params.bezirk,req.params.info.toLowerCase());
    }
    res.send(response);
});
router.get("/getStation/:Stationid", async (req, res) => {
  var response = await getStation(req.params.Stationid);
  res.send(response);
});

router.get("/getStation/:Stationid/:info", async (req, res) => {
  var response;
    if(req.params.info.toLowerCase() == "temp" || req.params.info.toLowerCase() == "pressure" || req.params.info.toLowerCase() == "windspeed" || req.params.info.toLowerCase() == "elevation")
    {
        response = await getStationInformation(req.params.Stationid,req.params.info.toLowerCase());
    }
  res.send(response);
});

router.get("/serverstatus", async (req, res) => {
  res.send("200");
});
module.exports = router;
