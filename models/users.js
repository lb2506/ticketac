var mongoose = require('mongoose')

var commande = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  departureTime: String,
  price: Number,
});

var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    tickets: [commande]
  });
  
  var userModel = mongoose.model('user', userSchema);

  module.exports = userModel;