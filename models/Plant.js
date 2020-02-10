const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: String,
  commonName: String,
  myName: { type: String, default: this.commonName },
  img: String,
  plantInfo: String,
  waterNeed: {
    type: String,
    enum: ["daily", "semi-weekly", "weekly", "biweekly", "monthly"]
  },
  light: {
    type: String,
    enum: ["Direct Sunlight", "Indirect Light", "Partial Shade", "Shade"]
  },
  temperature: {
    type: String,
    enum: ["15-20°C", "20°C-25°C", "25°C-30°C", "+30°C"]
  },
  soilCondition: { type: String, enum: ["damp", "perfect", "very dry"] }
});

const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;
