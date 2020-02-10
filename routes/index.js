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

router.post("https://api.plant.id/identify", (req, res, next) => {
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function() {
      if (this.files && this.files[0]) {
        let img = document.querySelector("img"); // $('img')[0]
        img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        img.onload = imageIsLoaded;
      }
    });
});
// router.get("/takeapic",(req,res,next)=>{

// }
// https://api.plant.id/identify

// app.get("/albums/:id", (req, res) => {
//   spotifyApi
//     .getArtistAlbums(req.params.id)
//     .then(data => {
//       //   res.json(data.body);
//       //   return;
//       //   console.log("Received from the api:", data.body);
//       console.log("Received from the api:", data.body);
//       res.render("albums.hbs", { albums: data.body.items });
//     })
//     .catch(error => console.log(error));
// });

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
