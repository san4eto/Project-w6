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
  username = req.user.username;
  console.log("USER", username);
  res.render("camera.hbs", { username: username });
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
router.get("/plantInfo", (req, res, next) => {
  console.log("testPLANTINFO");
  console.log("plantInfo", req.query);
  let id = req.query.plantFileId;
  let userID = req.user._id;
  axios
    .post("https://api.plant.id/check_identifications", {
      key: "UmsFkuSbBP6RHGd2cX8RseQopiEZyOG2sB6xiuayUXjl1w8rMz",
      ids: [parseFloat(id)]
    })

    .then(plantInfo => {
      let images = plantInfo.data[0].images[0];
      let plant = plantInfo.data[0].suggestions[0].plant;
      let plantReal = plantInfo.data[0].suggestions[0].plant.name;
      let plantNormalName = plantInfo.data[0].suggestions[0].plant.common_name;
      let probability = plantInfo.data[0].suggestions[0].probability;
      let reqId = plantInfo.data[0].id;
      let userID = req.user._id;

      Plant.create({
        belongsTo: userID,
        reqId: reqId,
        name: plantNormalName,
        img: "images",
        botanicalName: plantReal,
        commonName: plantNormalName
      })
        .then(newPlant => {
          console.log("NOVO DB");
          console.log(newPlant);
          console.log(images);
          res.render("plantInfo.hbs", {
            plant: plant,
            plantimage: images,
            plantId: newPlant._id
          });
        })
        .catch(err => {
          next(err);
        });
    });
});

//   RETRIEVE PLANT DATA
//   GET  /myplants/:databaseId/:id- render care instructions based on databaseID

router.get("/plantForm/:id", (req, res) => {
  let userIDvalue = req.user._id;
  let plantId = req.params.id;
  // console.log("userPLANTFORM:", req.user);
  //console.log(userIDvalue);
  res.render("plantForm.hbs", { userID: userIDvalue, plantId });
});

const waterNeedEnum = ["daily", "semi-weekly", "weekly", "biweekly", "monthly"];

router.post("/plantForm/:id", (req, res, next) => {
  const plantName = req.body.myName;
  const userID = req.user._id;
  const plantId = req.params.id;
  console.log(plantId);
  // const waterNeed = req.body.waterNeed;
  const waterNeed =
    waterNeedEnum[Math.floor(Math.random() * waterNeedEnum.length)];
  const light = req.body.light;
  const temperature = req.body.temperature;
  const soil = req.body.soilCondition;

  console.log(req.user);
  console.log(req.body);
  console.log("my plant", plantName);

  Plant.findOneAndUpdate(plantId, {
    myName: plantName,
    waterNeed: waterNeed,
    light: light,
    temperature: temperature,
    soilCondition: soil
  })
    .then(plantDocument => {
      const plantID = plantDocument._id;
      console.log(plantID);

      User.findOneAndUpdate(
        { _id: userID },
        { $push: { myPlants: plantID } },
        { new: true }
      )
        .then(result => console.log("result", result))
        .catch(err => console.log("error", err));
    })

    .then(plantDocuments => {
      // 3 once the comment has been created and the Room.comments updated, we send a response -> FRONTEND
      res.render("plantCare.hbs", {
        myName: plantName,
        waterNeed: waterNeed,
        light: light,
        temperature: temperature,
        soilCondition: soil
      });
    })
    .catch(err => {
      next(err);
    });
});

// router.post("/result/databaseId", (req, res) => {
//   res.render("plantCare.hbs");
// });

// router.get("/result/databaseId", (req, res) => {
//   res.render("plantCare.hbs");
// });

// CALENDAR
// GET   /myplants/:databaseId/:id
// router.get("/myplants/userId/calendar", (req, res) => {
//   res.render("calendar.hbs");
// });

router.post("/calendar", (req, res) => {
  const userID = req.user._id;
  res.redirect("/calendar/:id");
});

router.get("/calendar/:id", (req, res) => {
  const userID = req.user._id;
  console.log("posledno", userID);
  res.render("calendar.hbs", { userID: userID });
});

// (add to calendar)
// POST / /myplants/survivalcalendar - edit available calendar adding X

// MY PLANTS
// GET /myplants/overview
// -> render name of each plant ID
router.get("/myplants/userId", (req, res) => {
  let username = req.user.username;
  let userPlants = req.user.myPlants;
  console.log("MOITE CVETQ", req.user);

  Plant.find()
    .then(myPlants => {
      res.render("myPlants.hbs", { myPlants, user: req.user });
    })
    .catch(err => {
      next(err);
    });

  // res.render("myPlants.hbs", { username: username, myPlants: userPlants });
});

module.exports = router;
