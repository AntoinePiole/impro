const account = require('./usersLib.js');
var express = require('express');
var router = express.Router();

//Getter
router.get('/', account.getUsers);  
router.get('/logout', account.logout);
router.get('/:id', account.getUserById);  
//Setter
router.patch('/:id', account.patchUserById); 
//Constructor
router.post('/', account.signup, function(req,res){res.status(200).json({session:req.session})});
//Logging
router.post('/login', account.login, function(req,res){res.status(200).json({session:req.session})});
//User in a league
router.get('/leagues/join/:leagueId', account.getDetailedMemberPropositionsOfLeague); //Get the member propositions of the league
router.get('/leagues/:leagueId', account.getUsersOfLeague); //Get the users (the object) of the league
//Search a user
router.get('/search/:queryText', account.searchUser);
module.exports = router;