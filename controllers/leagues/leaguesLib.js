const League = require('../../models/leagueModel.js');

function getLeagues(req, res) {
    League.find({}
    ,function (err, leagues) {
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        } else if (!leagues) {
            res.status(401).json({
                "text": "Aucun utilisateur trouvé"
            })
        } else {
            //console.log("logged in with " + league)
            res.status(200).json({
                "leagues": leagues,
                "text": "Authentification réussi"
            })
        }
    })
}

function getLeagueById(req, res) {
    try {
        _id = req.params.id
    } catch (err) {
        res.status(400).json({
            "text": "invalid request"
        })
    }
    var query = League.findOne({_id:_id});
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {
        res.status(200).json({ 
            "league" : league
        })
        }
    })
}


function patchLeagueById(req, res) {
    if (!req.params.id || !req.body) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var _id = req.params.id;
        var findLeague = new Promise(function (resolve, reject) {
            League.findOneAndUpdate({  _id: _id }, req.body,
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
        findLeague.then(function () {
            League.findOne({_id:_id}
                ,function (err, league) {
                    if (err) {
                        res.status(500).json({
                            "text": "Erreur interne en essayant de créer le compte"
                        })
                    } else {
                        res.status(200).json({
                            "text": "Succès",
                            "league": league,
                        })
                    }
                }
            )
        })
    }
}


function makeLeague(req, res) {
    if (!req.body.name) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var league = {
            name: req.body.name,
            nickname: req.body.nickname,
            desc: req.body.desc,
            email: req.body.desc,
            photoId: req.body.photoId,
            members: [{id:req.body.userId, isAdmin:true}],
            receivedMatchRequestsIds: [],
            sentMatchRequestsIds: []
        }
        var findLeague = new Promise(function (resolve, reject) {
            League.findOne({
                name: league.name
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

        findLeague.then(function () {
            var _l = new League(league);
            _l.save(function (err, league) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne en essayant de créer la ligue"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "id": league._id
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
                        "text": "Une ligue du même nom existe déjà"
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

function addToLeague(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOneAndUpdate(
        { _id: leagueId }, 
        { $push: { members: {id:userId, isAdmin:false} } }
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {      
            res.status(200).json({ 
                "text" : "Success",
                "league" : league
            })
        }
    })
}

function removeFromLeague(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOneAndUpdate(
        { _id: leagueId }, 
        { $pull: { members: {id:userId} } }
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {      
            res.status(200).json({ 
                "text" : "Success",
                "league" : league
            })
        }
    })
}
function setRoleInLeague(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    console.log("getting to the tough part");
    var query = League.findOneAndUpdate(
        { _id: leagueId }, 
        { $set: { "members.$.isAdmin" : req.body.role } },
        console.log("yes")
    )
    query.exec(function(err, league){
        console.log(err)
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        }
        else {      
            res.status(200).json({ 
                "text" : "Success",
                "league" : league
            })
        }
    })
}

exports.getLeagues = getLeagues;
exports.getLeagueById = getLeagueById;
exports.patchLeagueById = patchLeagueById;
exports.makeLeague = makeLeague;
exports.addToLeague = addToLeague;
exports.removeFromLeague = removeFromLeague;
exports.setRoleInLeague = setRoleInLeague;