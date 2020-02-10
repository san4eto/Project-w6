const express = require("express");
const router = express.Router();
// const Room = require("../models/Room");
// const Comment = require("../models/Comment");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*GET CAMERA*/
router.get("/takeapic", (req, res, next) => {
  res.render("camera.hbs");
});
//Confirm plant
//GET  /result/:databaseId
// POST /myplants/:databaseId/:id - render care instructions form
// <form action="/myplants/{{:userId}}/{{:databaseId}}/:id" method="POST"></form>

router.get("/result/:databaseId", (req, res) => {
  Plant.find()
    .then(plant => {
      res.render("/plantInfo.hbs", { plant, user: req.user });
    })
    .catch(err => {
      next(err);
    });
});

//   RETRIEVE PLANT DATA
//   GET  /myplants/:databaseId/:id- render care instructions based on databaseID

// CALENDAR
// GET   /myplants/:databaseId/:id

// (add to calendar)
// POST / /myplants/survivalcalendar - edit available calendar adding X

// MY PLANTS
// GET /myplants/overview
// -> render name of each plant ID

module.exports = router;
