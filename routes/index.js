var express = require("express");
var router = express.Router();
var myFunctions = require("../models/app");

router.get("/getData/:bezirk", async (req, res) => {
  var response;
  if(req.params.bezirk > 23 || req.params.bezirk < 1)
  {
    response = {"ERR":"400 Bad Request"};
    res.send(response);
    return;
  }

  if(req.params.bezirk.toLowerCase() =="all")
  {
    response = await myFunctions.GetLocation("all");
    res.send(response);
    return;
  }
  
  response = await myFunctions.GetLocation(req.params.bezirk);
  res.send(response);
});

router.get("/getData/:bezirk/:info", async (req, res) => {
 
  var response;
  if(req.params.info.toLowerCase() == "temp" || req.params.info.toLowerCase() == "pressure" || req.params.info.toLowerCase() == "windspeed" || req.params.info.toLowerCase() == "elevation")
    {
        response = await myFunctions.Durchschnitt(req.params.bezirk,req.params.info.toLowerCase());
    }else
    {
      response = {"ERR":"400 Bad Request"};
    }
    (response == undefined) ? response = {"ERR":"400 Bad Request"}: null;
    res.send(response);
});
router.get("/getStation/:Stationid", async (req, res) => {
  var response = await myFunctions.getStation(req.params.Stationid);
  (response.length == 0) ? response = {"ERR":"400 Bad Request"} : null;
  res.send(response);
});

router.get("/getStation/:Stationid/:info", async (req, res) => {
  var response;
    if(req.params.info.toLowerCase() == "temp" || req.params.info.toLowerCase() == "pressure" || req.params.info.toLowerCase() == "windspeed" || req.params.info.toLowerCase() == "elevation")
    {
        response = await myFunctions.getStationInformation(req.params.Stationid,req.params.info.toLowerCase());
    }else
    {
      response = {"ERR":"400 Bad Request"};
    }
    (response == undefined) ? response = {"ERR":"400 Bad Request"}: null;
  res.send(response);
});

router.get("/serverstatus", async (req, res) => {
  res.send("200");
  
});
module.exports = router;
