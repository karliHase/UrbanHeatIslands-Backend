var express = require("express");
var router = express.Router();
const { GetLocation } = require("../models/app");

router.get("/getData/:bezirk", async (req, res) => {
  var response = await GetLocation(req.params.bezirk);
  res.send(response);
});

module.exports = router;
