const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require("../models/User");
const Plant = require("../models/Plant");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*GET CAMERA*/
router.get("/upload", (req, res, next) => {
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

// PLANT INFO PAGE
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
      let images = plantInfo.data[0].images[0];
      let plant = plantInfo.data[0].suggestions[0].plant;
      console.log(plant);
      console.log(images);
      res.render("plantInfo.hbs", { plant: plant, plantimage: images });
    });
});

//   RETRIEVE PLANT DATA
//   GET  /myplants/:databaseId/:id- render care instructions based on databaseID

router.get("/plantForm", (req, res) => {
  let userIDvalue = req.user._id;
  console.log(userIDvalue);
  res.render("plantForm.hbs", { userID: userIDvalue });
});

router.post("/plantForm/:id", (req, res, next) => {
  console.log("plant");
  // 2 the axios POST request is detected and handled
  const plantName = req.body.myName;
  const userID = req.user._id;

  console.log("my olant", plantName);

  Plant.create({
    myName: plantName
  })
    .then(plantDocument => {
      console.log("hzuhuzh", plantDocument);
      const plantID = plantDocument._id;

      return User.updateOne({ _id: userID }, { $push: { myPlants: plantID } });
    })

    .then(() => {
      // 3 once the comment has been created and the Room.comments updated, we send a response -> FRONTEND
      res.render("plantCare.hbs", {});
    })
    .catch(err => {
      next(err);
    });
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
