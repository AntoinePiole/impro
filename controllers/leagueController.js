const leagues = require('./leagues/leaguesLib.js');


var express = require('express');
var router = express.Router();

//Getter
router.get('/', leagues.getLeagues);  
router.get('/:id', leagues.getLeagueById);  
//Setter
router.patch('/:id', leagues.patchLeagueById); 
//Constructor
router.post('/', leagues.makeLeague);
//User in a league
router.get('/add/:leagueId/users/:userId', leagues.addToLeague); //Get league Id with req.params.leagueId and userId with req.params.userId
router.get('/remove/:leagueId/users/:userId', leagues.removeFromLeague); //same
router.patch('/patch/:leagueId/users/:userId', leagues.setRoleInLeague); //same, new role will be in the body

module.exports = router;