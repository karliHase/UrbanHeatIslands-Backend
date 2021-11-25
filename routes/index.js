var express = require("express");
var router = express.Router();
const { GetLocation, Durchschnitt,getStation } = require("../models/app");

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
  switch(req.params.info.toLowerCase())
    {
      case "temp":
        response = await Durchschnitt(req.params.bezirk,req.params.info.toLowerCase());
      break;
      case "pressure":
        response = await Durchschnitt(req.params.bezirk,req.params.info.toLowerCase());
      break;
    }
    res.send(response);
});
router.get("/getStation/:Stationid", async (req, res) => {
  var response = await getStation(req.params.Stationid);
  res.send(response);
});
router.get("/serverstatus", async (req, res) => {
  res.send("200");
});
module.exports = router;
