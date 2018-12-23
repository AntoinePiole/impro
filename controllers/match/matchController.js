const match = require('./libMatch.js');

module.exports = function (app) {
    app.get('/matches/:id',match.getMatch);
    app.post('/matches', match.makeMatch);
    app.patch('/matches/:id', match.patchMatch);
    app.patch('matches/:matchId/user/:userId?add=true', match.addToMatch);
    app.patch('matches/:matchId/user/:userId?add=false', match.removeFromMatch);
}