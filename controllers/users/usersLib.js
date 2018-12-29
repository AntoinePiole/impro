const User = require('../../models/userModel.js');
const League = require('../../models/leagueModel.js');
const passwordHash = require("password-hash");

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password),
            phone: req.body.phone,
            familyName: req.body.familyName,
            firstName: req.body.firstName,
            username: req.body.firstName + req.body.familyName,
            birthday: req.body.birthday,
            photoId: req.body.photoId,
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                
                console.log(err, user)
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne en essayant de créer le compte"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken(),
                        "id": user._id
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

function login(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    text: "Erreur interne"
                })
            } else if (!user) {
                res.status(400).json({
                    text: "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    //console.log("logged in with " + user)
                    res.status(200).json({
                        token: user.getToken(),
                        id: user._id,
                        text: "Authentification réussi"
                    })
                } else {
                    res.status(401).json({
                        text: "Mot de passe incorrect"
                    })
                }
            }
        })
    }
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
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
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
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
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
        {name: condition}
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
exports.signup = signup;
exports.getUsersOfLeague = getUsersOfLeague;
exports.searchUser = searchUser;