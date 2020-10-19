const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {

  app.get(`/api/exercise/user`, async(req, res) => {
    let users = await User.find();
    return res.status(200).send(users);
  });

  app.post(`/api/exercise/new-user`, async(req, res) => {
    let user = await User.create(req.body, function(err, user) {
      if (err) { return console.log(err)};
    });
    return res.status(201).send({
      error: false, user
    })
  })


}
