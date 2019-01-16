const leagues = require('./leaguesLib.js');
var express = require('express');
var router = express.Router();

//Getter
router.get('/', leagues.getLeagues);  
router.get('/:id', leagues.validateParamsId, leagues.getLeagueById);  
//Setter
router.patch('/:id', leagues.validateLeague, leagues.validateParamsId, patchLeagueById); 
//Constructor
router.post('/', leagues.validateLeagueRequired, leagues.makeLeague);
//User in a league
router.post('/:leagueId/users/:userId', leagues.validateParamsLeagueId, leagues.validateParamsUserId, leagues.addToLeague); //Get league Id with req.params.leagueId and userId with req.params.userId
router.delete('/:leagueId/users/:userId', leagues.validateParamsLeagueId, leagues.validateParamsUserId, leagues.removeFromLeague); //same
router.patch('/:leagueId/users/:userId', leagues.validateParamsLeagueId, leagues.validateParamsUserId, leagues.setRoleInLeague); //same, new role will be in the body
router.post('/join/:leagueId/users/:userId', leagues.validateParamsLeagueId, leagues.validateParamsUserId, leagues.requestToJoin);
router.patch('/join/:leagueId/users/:userId', leagues.validateParamsLeagueId, leagues.validateParamsUserId, leagues.acceptMember);
router.delete('/join/:leagueId/users/:userId', leagues.validateParamsLeagueId, leagues.validateParamsUserId, leagues.refuseMember);
router.get('/users/:userId/', leagues.validateParamsUserId, leagues.getLeaguesOfUser); // Get all the leagues where corresponding user is, whatever their role
//Search league
router.get('/search/:queryText', leagues.searchLeague);
module.exports = router;