const account = require('./users/usersLib.js');
var express = require('express');
var router = express.Router();

//Getter
router.get('/', account.getUsers);  
router.get('/:id', account.getUserById);  
//Setter
router.patch('/patch/:id', account.patchUserById); 
//Constructor
router.post('/signup', account.signup);
//Logging
router.post('/login', account.login);

module.exports = router;