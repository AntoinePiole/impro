const User = require('../../models/userModel.js');
const League = require('../../models/leagueModel.js');
const passwordHash = require("password-hash");
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //passport strategy, TO MODIFY if needed

//function called when need there's a request (?) : adds req.user containing logged user object
passport.serializeUser(function(user, done) { //let go of the user object and stores only id
    console.log('serializing');
    done(null, user._id);
  });
  
passport.deserializeUser(function(id, done) { //opposite : finds the user object to add to req
    console.log('deserializing');
    User.findById(id, done);
  });
  
passport.use('login',new LocalStrategy(
    {usernameField:'email'},
    function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) { console.log('passport error'); return done(err); }
        if (!user) {
            console.log('username pb'); 
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.verifyPassword(password)) {
            console.log('mdp pb');
            return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('np'); 
        return done(null, user);
        });
    }
));

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({email:email},function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // if user already exists
        if (user) {
          console.log('User already exists');
          return done(null, false);
        }
        // if there is no user with that email
        // create the user
        var user = {
            email: req.body.email,
            password: passwordHash.generate(password),
            phone: req.body.phone,
            familyName: req.body.familyName,
            firstName: req.body.firstName,
            username: req.body.firstName + req.body.familyName,
            birthday: req.body.birthday,
            photoId: req.body.photoId,
        }
        var newUser = new User(user);

        // save the user
        newUser.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
        }
        console.log('User Registration succesful');    
        return done(null, newUser);
        });
    })
}
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
}))


function login(req,res,next){ //MIGHT LEAD TO BUGS, if so go back to export passport and passport.authenticate('login') in controller
    const middleware = passport.authenticate('login');
    middleware(req,res,next)
}

function logout(req,res){
    req.logout();
    res.status(200).json({text: "Succesfully logged out"})
}

function signup(req,res,next){
    const middleware = passport.authenticate('signup');
    middleware(req,res,next);
}


function getUserById(req, res) {
    try {
        _id = req.params.id
    } catch (err) {
        res.status(400).json({
            text: "invalid request"
        })
    }
    var query = User.findOne({_id:_id});
    query.exec(function(err, user){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        }
        else {
        res.status(200).json({ //note : this does not send a secure user, it isn't crypted, etc. In final version, change it so that is contains no critical information.
            user : user
        })
        }
    })
}

function getUsers(req, res) {
    User.find({}
    , function (err, users) {
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        } else if (!users) {
            res.status(401).json({
                text: "Aucun utilisateur trouvé"
            })
        } else {
            //console.log("logged in with " + user)
            res.status(200).json({
                users: users,
                text: "Authentification réussi"
            })
        }
    })
}

function patchUserById(req, res) {
    if (!req.params.id || !req.body) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        var _id = req.params.id;
        var findUser = new Promise(function (resolve, reject) {
            User.findOneAndUpdate({  _id: _id }, req.body,
                function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        resolve(true)
                    } else {
                        reject(500);
                    }
                }
            })
        })
        findUser.then(function () {
            User.findOne({_id:_id}
                ,function (err, user) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            text: "Erreur interne en modifiant le compte"
                        })
                    } else {
                        res.status(200).json({
                            text: "Succès",
                            user: user,
                        })
                    }
                }
            )
        })
    }
}


/**
 * 
 * Returns a list of members, where each member has all the parameters of a normal user
 * 
 */
function getUsersOfLeague(req, res) {
    if (!req.params.leagueId ) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        var findLeague = new Promise(function (resolve, reject) {
            League.findOne({
                _id: req.params.leagueId
            }, function (err, league) {
                if (err) {
                    reject(500);
                } else if (!league) {
                    reject(404)
                } else {
                    resolve(league)
                }
            })
        });
        findLeague.then(function (league) {
            var userIds=[]
            for (var i=0; i < league.members.length; i++) {
                userIds.push(league.members[i]._id);
            }
            var findUsers = new Promise(function (resolve, reject) {
                User.find({
                    _id: {$in: userIds}, 
                }, function (err, users) {
                    if (err) {
                        reject(500);
                    } 
                    else {
                        resolve(users)
                    }
                })
            });
            findUsers.then(function(users) {
                res.status(200).json({
                    "text": "Success",
                    users : users
                })
            }, function(err, users) {
                if(err) {
                    res.status(500).json({
                        text : "Erreur interne en récupérant les utilisateurs"
                    })
                }
            })
        }
        
        , function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        text: "Erreur interne"
                    })
                    break;
                case 404:
                    res.status(404).json({
                        text: "No league found"
                    })
                    break;
                default:
                    res.status(500).json({
                        text: "Erreur interne"
                    })
            }
        })
    }
}


function getDetailedMemberPropositionsOfLeague(req, res) {
    if (!req.params.leagueId ) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        var findLeague = new Promise(function (resolve, reject) {
            League.findOne({
                _id: req.params.leagueId
            }, function (err, league) {
                if (err) {
                    reject(500);
                } else if (!league) {
                    reject(404)
                } else {
                    resolve(league)
                }
            })
        });
        findLeague.then(function (league) {
            var userIds=league.memberPropositions
            var findUsers = new Promise(function (resolve, reject) {
                User.find({
                    _id: {$in: userIds}, 
                }, function (err, users) {
                    if (err) {
                        reject(500);
                    } 
                    else {
                        resolve(users)
                    }
                })
            });
            findUsers.then(function(users) {
                res.status(200).json({
                    "text": "Success",
                    users : users
                })
            }, function(err, users) {
                if(err) {
                    res.status(500).json({
                        text : "Erreur interne en récupérant les utilisateurs"
                    })
                }
            })
        }
        , function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        text: "Erreur interne"
                    })
                    break;
                case 404:
                    res.status(404).json({
                        text: "No league found"
                    })
                    break;
                default:
                    res.status(500).json({
                        text: "Erreur interne"
                    })
            }
        })
    }
}

/**
 * finds the list of users which names contain the string req.params.queryText
 */
function searchUser(req, res){
    if (!req.params.queryText){
        res.status(400).json({
            text: "Requête invalide"
        });
        return ;
    }
    const name = req.params.queryText;
    const condition = new RegExp("^.*"+name+".*$","i"); //this is supposed to turn the name parameter into a regexp condition to find all results containing the request
    const query = User.find(
        {username: condition}
    );
    query.exec(function (err, results){
        if(err){
            res.status(500).json({
                text: 'Erreur interne'
            });
            return;
        }
        res.status(200).json({
            results: results
        });
    })
}

exports.patchUserById = patchUserById;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.login = login;
exports.logout = logout;
exports.signup = signup;
exports.getUsersOfLeague = getUsersOfLeague;
exports.getDetailedMemberPropositionsOfLeague = getDetailedMemberPropositionsOfLeague;
exports.searchUser = searchUser;
