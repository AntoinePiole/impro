//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var usersRouter = require(__dirname + '/controllers/userController');
var leaguesRouter = require(__dirname + '/controllers/leagueController');
var imagesRouter = require(__dirname + '/controllers/imageController');
var matchesRouter = require(__dirname + '/controllers/match/matchController');

//Connexion à la base de donnée
mongoose.connect('mongodb://localhost/db').then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});


//On définit notre objet express nommé app
const app = express();

//Body Parser
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 1000000}))

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Définition du routeur
app.use(express.static(__dirname + '/public/uploads'));
app.use('/users', usersRouter);
app.use('/leagues', leaguesRouter);
app.use('/images', imagesRouter);
app.use('/matches', matchesRouter);

//Définition et mise en place du port d'écoute
var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));