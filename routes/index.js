var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journey')
var userModel = require('../models/users')

/* GET "/" */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    req.session.user = null;
  }
  res.render('login');
});

/* ROUTE RESULT */
router.get('/result', function(req, res, next) {
  
  res.render('result', {searchJourney: req.session.user.journeys})
});

/* ROUTE NO RESULT */
router.get('/noresult', function(req, res, next) {
  res.render('noresult');
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
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      firstname: newUserSave.firstname,
      lastname: newUserSave.lastname,
      id: newUserSave._id,
    }

    res.render('homepage')
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
      firstname: searchUser.firstname,
      lastname: searchUser.lastname,
      id: searchUser._id
    }
    res.redirect('/homepage')
  } else {
    res.redirect('/')
  }

});

/* ROUTE GET HOMEPAGE */
router.get('/homepage', async function(req, res, next) {
  if (req.session.user == null) {
    res.redirect('/');
  } else {
  res.render('homepage');
  }
});

/* ROUTE POST HOMEPAGE */
router.post('/homepage', async function(req, res, next) {

  var searchJourney = await journeyModel.find({
    departure: req.body.departureFromFront,
    arrival: req.body.arrivalFromFront,
    date: req.body.dateFromFront,
  })

  if(searchJourney.length == 0){
    res.redirect('/noresult');
  } else {
    req.session.user.journeys = searchJourney
    res.redirect('/result');
  }

});

/* ROUTE BASKET */
router.get('/basket', async function(req, res, next) {
  if (!req.session.basket) {
    req.session.basket = []
  }

    req.session.basket.push({
      departure: req.query.departureFromFront,
      arrival: req.query.arrivalFromFront,
      date: req.query.dateFromFront,
      departureTime: req.query.departureTimeFromFront,
      price: req.query.priceFromFront
    })

    var dataBasket=req.session.basket

  res.render('basket', {dataBasket});
});

// ROUTE ENREGISTRER //
router.get('/confirm', async function(req, res, next) {
  var dataBasket=req.session.basket
  var user = await userModel.findById(req.session.user.id)

  for (var i=0; i<dataBasket.length; i++) {
  await user.tickets.push({
    departure: dataBasket[i].departure,
    arrival: dataBasket[i].arrival,
    date: dataBasket[i].date,
    departureTime: dataBasket[i].departureTime,
    price: dataBasket[i].price
  })
}
  var userSaved = await user.save(); 
  req.session.basket = null;
  
  res.redirect('homepage');
});

/* ROUTE LASTTRIPS */
router.get('/lasttrips', async function(req, res, next) {
  console.log('début de la route LASTTRIPS')
  var lastTrips = await userModel.findById({_id : req.session.user.id})
  console.log(lastTrips)
  res.render('lasttrips', {lastTrips});
});

/* ROUTE LOGOUT */
router.get('/logout', function(req,res,next){
  req.session.user = null;
  req.session.basket = null;
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
