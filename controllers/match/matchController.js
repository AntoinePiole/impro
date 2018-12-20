const match = require('./libMatch.js');

module.exports = function (app) {
    app.get('/match/:id',match.getMatch);
    app.post('/match', match.makeMatch);
    app.patch('/match/:id', match.patchMatch);
    app.patch('match/:matchId/user/:userId?add=true', match.addToMatch);
    app.patch('match/:matchId/user/:userId?add=false', match.removeFromMatch);
}