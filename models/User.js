const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Plant = require("../models/Plant");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    myPlants: [{ type: Schema.Types.ObjectId, ref: "Plant" }]
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
