const express = require ('express');
const match = require('./libMatch.js');
const router = express.Router();

router.get('/:id', match.getMatch);
router.get('/search/:queryText', match.searchMatch);
router.post('/', match.validateRequired, match.makeMatch);
router.patch('/:id', match.patchMatch);
router.patch('/:matchId/user/:userId/add=true', match.addToMatch);
router.patch('/:matchId/user/:userId/add=false', match.removeFromMatch);

module.exports = router;