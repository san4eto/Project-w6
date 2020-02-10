// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Plant = require("../models/Plant");
const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/project-w6", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt))
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

let plants = [
  {
    name: "Strelitzia nicolai",
    commonName: "Giant White Bird Of Paradise",
    myName: "Test1",
    img: "http://davesgarden.com/guides/pf/go/2466/",
    plantInfo: "blablalala ",
    waterNeed: "daily",
    light: "Direct Sunlight",
    temperature: "15-20°C",
    soilCondition: "perfect"
  },

  {
    name: "2 Strelitzia nicolai",
    commonName: "Giant White Bird Of Paradise",
    myName: "Test2",
    img: "http://davesgarden.com/guides/pf/go/2466/",
    plantInfo: "blablalala ",
    waterNeed: "daily",
    light: "Direct Sunlight",
    temperature: "15-20°C",
    soilCondition: "damp"
  }
];
