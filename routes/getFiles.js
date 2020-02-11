const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
router.get("/test", (req, res) => {
  console.log("test ");
  console.log(req.query);
});
module.exports = router;
