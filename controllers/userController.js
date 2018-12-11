const account = require('./users/usersLib.js');
var express = require('express');
var router = express.Router();

//Getter
router.get('/', account.getUsers);  
router.get('/:id', account.getUserById);  
//Setter
router.patch('/:id', account.patchUserById); 
//Constructor
router.post('/', account.signup);
//Logging
router.post('/login', account.login);
//User in a league
router.get('/leagues/:leagueId', account.getUsersOfLeague); //Get the users (the object) of the league
module.exports = router;