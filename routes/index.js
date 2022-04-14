var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();

var journeyModel = require('../models/journey')
var userModel = require('../models/users')

/* GET "/" */
router.get('/', function(req, res, next) {
  res.render('login', {});
});

/* ROUTE SIGN-UP */
router.post('/sign-up', async function(req, res, next) {

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new userModel({
      firstname: req.body.firstnameFromFront,
      lastname: req.body.lastnameFromFront,
      password: req.body.passwordFromFront,
      username: req.body.usernameFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      firstname: newUserSave.firstname,
      lastname: newUserSave.lastname,
      id: newUserSave._id,
    }

    res.redirect('/homepage')
  } else {
    res.redirect('/')
  }
  
});

/* ROUTE SIGN-IN */
router.post('/sign-in', async function(req, res, next) {

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  })

  if(searchUser!= null){
    req.session.user = {
      firstname: newUserSave.firstname,
      lastname: newUserSave.lastname,
      id: newUserSave._id,
    }
    res.redirect('/homepage')
  } else {
    res.redirect('/')
  }

});

/* ROUTE HOMEPAGE */
router.get('/homepage', function(req, res, next) {

  //var searchJourney = await journeyModel.find()

//   if(searchJourney!= null){
//     //Ou plutôt if 'searchJourney est un tableau vide
//   res.render('result', {searchJourney});
// } else {
//   res.redirect('/error');
// }

res.render('homepage')

});

// /* ROUTE RESULT */
// router.get('/result', function(req, res, next) {

//   res.render('result', {});
// });

// /* ROUTE BASKET */
// router.get('/basket', function(req, res, next) {
//   res.render('basket', {});
// });

// /* ROUTE ORDERS */
// router.get('/orders', function(req, res, next) {
//   res.render('oders', {});
// });

/* ROUTE LOGOUT */
router.get('/logout', function(req,res,next){
  req.session.user = null;
  res.redirect('/')
});

module.exports = router;

// -----------------DÉPLACÉ DANS connection.js-----------------------------------------
// const mongoose = require('mongoose');

// // useNewUrlParser ;)
// var options = {
//   connectTimeoutMS: 5000,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
//  };

// mongoose.connect('mongodb+srv://lb2506:LEo.250696@cluster0.88vky.mongodb.net/Ticketac?retryWrites=true&w=majority',
//    options,
//    function(err) {
//     if (err) {
//       console.log(`error, failed to connect to the database because --> ${err}`);
//     } else {
//       console.info('*** Database Ticketac connection : Success ***');
//     }
//    }
// );

// -----------------DÉPLACÉ DANS journey.js------------------------------------------------

// var journeySchema = mongoose.Schema({
//   departure: String,
//   arrival: String,
//   date: Date,
//   departureTime: String,
//   price: Number,
// });

// var journeyModel = mongoose.model('journey', journeySchema);


//--------------- A SUPPRIMER -----------------------------------------------------------------
// var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
// var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]


//------------ A SUPPRIMER (Code pour remplir la bdd une première fois)---------------------------
// Remplissage de la base de donnée, une fois suffit
// router.get('/save', async function(req, res, next) {

//   // How many journeys we want
//   var count = 300

//   // Save  --------
//     for(var i = 0; i< count; i++){

//     departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
//     arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

//     if(departureCity != arrivalCity){

//       var newUser = new journeyModel ({
//         departure: departureCity , 
//         arrival: arrivalCity, 
//         date: date[Math.floor(Math.random() * Math.floor(date.length))],
//         departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
//         price: Math.floor(Math.random() * Math.floor(125)) + 25,
//       });
       
//        await newUser.save();

//     }

//   }
//   res.render('index', { title: 'Express' });
// });

//------------ A SUPPRIMER (Code pour vérifier la connection à la bdd une première fois)---------------------------

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
// router.get('/result', function(req, res, next) {

//   // Permet de savoir combien de trajets il y a par ville en base
//   for(i=0; i<city.length; i++){

//     journeyModel.find( 
//       { departure: city[i] } , //filtre
  
//       function (err, journey) {

//           console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
//       }
//     )

//   }


//   res.render('index', { title: 'Express' });
// });
