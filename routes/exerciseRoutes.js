const mongoose = require("mongoose");
const Exercise = mongoose.model("exercises");
const User = mongoose.model("users");

module.exports = (app) => {

  app.get(`/api/exercise/log/:userId?/:startDate?/:endDate?/:limit?`, function(req, res) {

    let dateRange = {}
    if (req.query.startDate !== "") {dateRange[`$gte`] = req.query.startDate};
    if (req.query.endDate !=="") {dateRange[`$lte`] = req.query.endDate};
    let searchParam = {name: req.query.userId};
    if (req.query.startDate !=="" || req.query.endDate !== ""){searchParam.date = dateRange};

     const exercises = Exercise.find( searchParam, (err, exercises) => {
      if (err) {return console.log(err.message)};
      res.status(200).send(exercises);
    }).limit(parseInt(req.query.limit));
  });

  app.post(`/api/exercise/add`, function(req, res, done) {
    const exercise = Exercise.create({
      name: req.body.name,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date
    }, function(err, exercise) {
      if (err) {console.log(err.message)}
      User.findOne({name: req.body.name}, function(err, user) {
        if (err) { return console.log(err.message)};
        user.log.push(exercise);
        user.save();
        console.log(user);
        return res.status(201).send({
          error: false, user
        })
      done(null, user);
      })
    })
  })
};
