const leagues = require('./leagues/leaguesLib.js');

module.exports = function (app) {
    //Getter
    app.get('/', leagues.getLeagues);  
    app.get('/:id', leagues.getLeagueById);  
    //Setter
    app.patch('/patch/:id', leagues.patchLeagueById); 
    //Constructor
    app.post('/', leagues.makeLeague);
    //User in a league
    app.get('/add/:leagueId/users/:userId', leagues.addToLeague); //Get league Id with req.params.leagueId and userId with req.params.userId
    app.get('/remove/:leagueId/users/:userId', leagues.removeFromLeague); //same
    app.patch('/patch/:leagueId/users/:userId', leagues.setRoleInLeague); //same, new role will be in the body
}