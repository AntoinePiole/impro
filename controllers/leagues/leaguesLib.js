const League = require('../../models/leagueModel.js');

function getLeagues(req, res) {
    League.find({}
    ,function (err, leagues) {
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        } else if (!leagues) {
            res.status(401).json({
                text: "Aucune ligue trouvée"
            })
        } else {
            res.status(200).json({
                leagues: leagues,
            })
        }
    })
}

function getLeagueById(req, res) {
    try {
        _id = req.params.id
    } catch (err) {
        res.status(400).json({
            text: "invalid request"
        })
    }
    var query = League.findOne({_id:_id});
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        }
        else {
        res.status(200).json({ 
            league : league
        })
        }
    })
}


function patchLeagueById(req, res) {
    if (!req.params.id || !req.body) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        console.log(req.body)
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
                            text: "Erreur interne en essayant de créer le compte"
                        })
                    } else {
                        res.status(200).json({
                            text: "Succès",
                            league: league
                        })
                    }
                }
            )
        })
    }
}


function makeLeague(req, res) {
    if (!req.body.name || !req.body.userId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        var league = {
            name: req.body.name,
            nickname: req.body.nickname,
            desc: req.body.desc,
            email: req.body.email,
            photoId: req.body.photoId,
            members: [{_id:req.body.userId, isAdmin:true}],
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
                        text: "Erreur interne en essayant de créer la ligue"
                    })
                } else {
                    res.status(200).json({
                        text: "Succès",
                        id: league._id
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        text: "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        text: "Une ligue du même nom existe déjà"
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

function addToLeague(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOneAndUpdate(
        { _id: leagueId }, 
        { $push: { members: {_id:userId, isAdmin:false} } }
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        }
        else {      
            res.status(200).json({ 
                text : "Success",
                league : league
            })
        }
    })
}


function addToLeague(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOne(
        { _id: leagueId }, 
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
            return ; 
        }
        var members = league.members;
        if (members.some(e => (e._id == userId))) { //If the member already exists, it is not added
        }
        else {
            members.push({_id:userId, isAdmin:false})
            var query = League.findOneAndUpdate(
                { _id: leagueId }, 
                {members: members}
            )
            query.exec(function(err, newLeague){
                if (err) {
                    res.status(500).json({
                        text: "Erreur interne"
                    })
                }
                else {
                    league = newLeague
                }
            })
        }
        res.json({
            text : "Success",
            league : league
        })
    })
}

function removeFromLeague(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOneAndUpdate(
        { _id: leagueId }, 
        { $pull: { members: {_id:userId} } }
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        }
        else {      
            res.status(200).json({ 
                text : "Success",
            })
        }
    })
}

function setRoleInLeague(req, res) {
    if (!req.params.userId || !req.params.leagueId ||req.body.role) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOneAndUpdate( {_id: leagueId, "members._id": userId},
        {$set: { "members.$.isAdmin" : req.body.isAdmin } }
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        }
        else {      
            res.status(200).json({ 
                text : "Success",
                _id : league._id,
            })
        }
    })
}

function requestToJoin(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOne(
        { _id: leagueId }, 
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
            return ; 
        }
        var memberPropositions = league.memberPropositions;
        var members = league.members;
        if (memberPropositions.some(e => (e === userId)) || members.some(e => (e._id == userId))) {
            
        }
        else {
            memberPropositions.push({_id:userId, isAdmin:false})
            var query = League.findOneAndUpdate(
                { _id: leagueId }, 
                {memberPropositions: memberPropositions}
            )
            query.exec(function(err, newLeague){
                if (err) {
                    res.status(500).json({
                        text: "Erreur interne"
                    })
                }
                else {
                    league = newLeague
                }
            })
        }
        res.json({
            text : "Success",
            league : league
        })
    })
}

function acceptMember(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOneAndUpdate(
        { _id: leagueId }, 
        { $pull: { memberPropositions: userId } }
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        }
        else {  
            addToLeague(req, res);
        }
    })
}



function refuseMember(req, res) {
    if (!req.params.userId || !req.params.leagueId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        userId = req.params.userId,
        leagueId = req.params.leagueId
    }
    var query = League.findOneAndUpdate(
        { _id: leagueId }, 
        { $pull: { memberPropositions: userId } }
    )
    query.exec(function(err, league){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        }
        else {      
            res.status(200).json({ 
                text : "Success",
            })
        }
    })
}



function patchLeagueById(req, res) {
    if (!req.params.id || !req.body) {
        res.status(400).json({
            text: "Requête invalide"
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
                            text: "Erreur interne en essayant de créer le compte"
                        })
                    } else {
                        res.status(200).json({
                            text: "Succès",
                            league: league,
                        })
                    }
                }
            )
        })
    }
}

function addMatchRequest(req, res) {
    if (!req.params.sendingId || !req.params.receivingId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        league1Id = req.params.sendingId,
        league2Id = req.params.receivingId
    }
    var findLeague1 = new Promise(function (resolve, reject) {
        League.findOne({  _id: league1Id },
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
    var findLeague2 = new Promise(function (resolve, reject) {
        League.findOne({  _id: league2Id },
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
    // TODO : PROMISE.ALL, GET ALL RESULTS
}


function getLeaguesOfUser(req, res) {
    if (!req.params.userId) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        var userId = req.params.userId;
        var findLeagues = new Promise(function (resolve, reject) {
                League.find({ 
                "members._id": userId
            }, function (err, leagues) {
                if (err) {
                    reject(500);
                } else {
                    resolve(leagues)
                }
            })
        })
        findLeagues.then(function (leagues) {
            res.status(200).json({
                text: "Succès",
                leagues : leagues
            }),
            function (error) {
                switch (error) {
                    case 500:
                        res.status(500).json({
                            text: "Erreur interne"
                        })
                        break;
                    case 204:
                        res.status(204).json({
                            text: "Une ligue du même nom existe déjà"
                        })
                        break;
                    default:
                        res.status(500).json({
                            text: "Erreur interne"
                        })
                }
            }
        })
    }
}

/**
 * finds the list of leagues which names contain the string req.params.queryText
 */
function searchLeague(req, res){
    if (!req.params.queryText){
        res.status(400).json({
            text: "Requête invalide"
        });
        return ;
    }
    const name = req.params.queryText;
    const condition = new RegExp("^.*"+name+".*$","i"); //this is supposed to turn the name parameter into a regexp condition to find all results containing the request
    const query = League.find(
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

function isAdminOfLeague(req, res, next){
    const userId = req.user._id;
    const leagueId = req.leagueId;
    if(!userId || !leagueId){
        res.status(400).json({text: "Missing id"});
        return;
    }
    League.findById(leagueId).exec(function(err, league){
        if(err){
            res.status(500).json({text: "Erreur interne"});
            return;
        }
        const member = league.members.find(
            member => member._id === userId
        );
        if(member){
            member.isAdmin ? next() : res.status(403).json({text: "League admins only"})
            return;
        }
        res.status(403).json({text: "League admins only"})
    })
}

exports.getLeagues = getLeagues;
exports.getLeagueById = getLeagueById;
exports.patchLeagueById = patchLeagueById;
exports.makeLeague = makeLeague;
exports.addToLeague = addToLeague;
exports.removeFromLeague = removeFromLeague;
exports.setRoleInLeague = setRoleInLeague;
exports.requestToJoin = requestToJoin;
exports.acceptMember = acceptMember;
exports.refuseMember = refuseMember;
exports.addMatchRequest = addMatchRequest;
exports.getLeaguesOfUser = getLeaguesOfUser;
exports.searchLeague = searchLeague;
exports.isAdminOfLeague = isAdminOfLeague;