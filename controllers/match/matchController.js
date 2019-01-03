const express = require ('express');
const match = require('./libMatch.js');
const router = express.Router();

router.get('/', match.getAllMatches);
router.get('/:id', match.validateParamsId, match.getMatch);
router.get('/search/:queryText', match.searchMatch);
router.get('/list/:matchesIds', match.validateParamsMatchesList, match.getMatchesList)
router.post('/', match.validateMatchRequired, match.makeMatch);
router.patch('/:id', match.validateParamsId, match.validateMatch, match.patchMatch);
router.patch('/:matchId/user/:userId/add=true', match.validateParamsUser, match.validateBodyUser, match.addToMatch);
router.patch('/:matchId/user/:userId/add=false', match.validateParamsUser, match.validateBodyUser, match.removeFromMatch);

module.exports = router;