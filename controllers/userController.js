const account = require('./user/lib.js');

module.exports = function (app) {
    app.post('/login', account.login);
    app.post('/signup', account.signup);
    app.get('/user/:id', account.getById);  //il marche pas :(
}