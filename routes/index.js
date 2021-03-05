var express = require("express");
var router = express.Router();

const myDB = require("../db/MyDB.js");

router.get("/getReports", async (req, res) => {
  try {
    const files = await myDB.getReports();
    res.send({ files: files });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

module.exports = router;
