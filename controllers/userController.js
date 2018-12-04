const account = require('./users/usersLib.js');

module.exports = function (app) {
    //Getter
    app.get('/', account.getUsers);  
    app.get('/:id', account.getUserById);  
    //Setter
    app.patch('/patch/:id', account.patchUserById); 
    //Constructor
    app.post('/signup', account.signup);
    //Logging
    app.post('/login', account.login);
}