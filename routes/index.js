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

let currUsername;
let currPassword;

router.post("/register", async (req, res) => {
  const userInfo = req.body;
  await myDB.insertData("safeTrip", "user", userInfo);
  res.redirect("/login.html");
});

router.post("/login", async (req, res) => {
  const dbRes = await myDB.getData("safeTrip", "user", req.body);
  if(dbRes.length === 0) {
    res.redirect("login.html");
  }else {
    currUsername = req.body.username;
    currPassword = req.body.password;
    await myDB.insertData("safeTrip", "currentLogin", req.body);
    res.redirect("/");
  }
});

router.get("/logout", async (req, res) => {
  const userInfo = req.body;
  await myDB.deleteData("safeTrip", "currentLogin", userInfo);
});

router.get("/check_current_login", async (req, res) => {
  const dbRes = await myDB.getData("safeTrip", "currentLogin", { "username": currUsername, "password": currPassword });

  if(dbRes.length === 0) {
    res.send({ result: false });
  }else {
    res.send({ result: true });
  }
});

module.exports = router;
