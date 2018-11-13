const User = require('../../models/userModel.js');
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
            password: passwordHash.generate(req.body.password)
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
                    "text": "Erreur interne"
                })
            } else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    //console.log("logged in with " + user)
                    res.status(200).json({
                        "token": user.getToken(),
                        "id": user._id,
                        "text": "Authentification réussi"
                    })
                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}


function getById(req, res) {
    console.log("trying to find something")
    try {
        _id = req.params.id
    } catch (err) {
        res.status(500).json({
            "text": "invalid request"
        })
    }
    var query = User.findOne({_id:_id});
    
    query.exec(function(err, user){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {
        res.status(200).json({ //note : this does not send a secure user, it isn't crypted, etc. In final version, change it so that is contains no critical information.
            "user" : user
        })
        }
    })
}

//On exporte nos deux fonctions
exports.getById = getById;
exports.login = login;
exports.signup = signup;