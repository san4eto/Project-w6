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

// router.get("/takeapic", (req, res) => {
//   Plant.find()
//     .then(plant => {
//       res.render("/plantInfo.hbs", { plant, user: req.user });
//     })
//     .catch(err => {
//       next(err);
//     });
// });

router.get("/plantInfo", (req, res) => {
  res.render("plantInfo.hbs");
});

//   RETRIEVE PLANT DATA
//   GET  /myplants/:databaseId/:id- render care instructions based on databaseID

router.get("/result", (req, res) => {
  res.render("plantForm.hbs");
});

// router.post("/result/databaseId", (req, res) => {
//   res.render("plantCare.hbs");
// });

router.get("/result/databaseId", (req, res) => {
  res.render("plantCare.hbs");
});

// CALENDAR
// GET   /myplants/:databaseId/:id
router.get("/myplants/userId/calendar", (req, res) => {
  res.render("calendar.hbs");
});
// (add to calendar)
// POST / /myplants/survivalcalendar - edit available calendar adding X

// MY PLANTS
// GET /myplants/overview
// -> render name of each plant ID
router.get("/myplants/userId", (req, res) => {
  res.render("myPlants.hbs");
});

module.exports = router;
