const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

require("./models/User");

const app = express();

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.DB_URI,
  {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.json());

require("./routes/userRoutes")(app);
require("./routes/exerciseRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("tracker/build"));
  const path = require("path");
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "tracket", "build", "index.html"));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app runnning on port ${PORT}`);
})
