const express = require("express");
const router = express.Router();
const axios = require("axios");

// const Room = require("../models/Room");
// const Comment = require("../models/Comment");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*GET CAMERA*/
router.get("/upload", (req, res, next) => {
  res.render("camera.hbs");
});

// // router.get("/takeapic",(req,res,next)=>{

// // }

// https://api.plant.id/identify

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
  console.log("test ");
  console.log(req.query);
  let id = req.query.plantFileId;
  axios
    .post("https://api.plant.id/check_identifications", {
      key: "UmsFkuSbBP6RHGd2cX8RseQopiEZyOG2sB6xiuayUXjl1w8rMz",
      ids: [parseFloat(id)]
    })
    .then(plantInfo => {
      let images = plantInfo.data[0].images[0].urlsmall;
      let plant = plantInfo.data[0].suggestions[0].plant;
      console.log(plant);
      res.render("plantInfo.hbs", { plant: plant, plantimage: images });
    });
});

//   RETRIEVE PLANT DATA
//   GET  /myplants/:databaseId/:id- render care instructions based on databaseID

router.get("/plantForm", (req, res) => {
  res.render("plantForm.hbs");
});
router.post("/plantForm", (req, res) => {
  console.log("Here we have the info: ", req.body);
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
