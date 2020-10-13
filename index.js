const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI,
  {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app runnning on port ${PORT}`);
})
