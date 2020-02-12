const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
router.get("/plantInfo", (req, res) => {});

router.post("/newPlant", (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  res.send(req.body);
});

module.exports = router;
