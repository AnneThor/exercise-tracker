const mongoose = require("mongoose");
const {Schema} = mongoose;

const exerciseSchema = new Schema({
  name: String,
  description: {type: String, required: true},
  duration: {type: Number, required: true, min: 1},
  date: {type: Date, required: true}
})

const userSchema = new Schema({
  name: { type: String,
          required: true,
          unique: true},
  log: [exerciseSchema]
})

mongoose.model("exercises", exerciseSchema);
mongoose.model("users", userSchema);
