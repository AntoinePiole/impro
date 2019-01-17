const Validator = require('./matchValidator');
const Match = require ('./matchModel');

function getAllMatches(req, res){
    Match.find({}, function(err, matches){
        if(err){
            res.status(500).json({
                text: "Erreur interne"
            })
            return;
        }
        res.status(200).json({
            matches:matches
        })
    })
}

function getMatch(req, res){ 

    const id = req.params.id;
    const query = Match.findById(id);

    query.exec(function (err, match){
        if(err){
            res.status(500).json({
                text: "Erreur interne"
            })
            return;
        }
        if(match){
            res.status(200).json({
                match: match
            });
            return;
        }
        res.status(404).json({
            text: "No match found with this id"
        })
    })
}

/**
 * finds the list of matches which names contain the string req.params.queryText
 */
function searchMatch(req, res){ 
    if (!req.params.queryText){
        res.status(200).json({
            results: []
        })
    }
    const name = req.params.queryText;
    const condition = new RegExp("^.*"+name+".*$","i"); //this is supposed to turn the name parameter into a regexp condition to find all results containing the request
    const query = Match.find(
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

function patchMatch(req, res){ 

    const id = req.params.id;
    const query = Match.findByIdAndUpdate(id, req.body, {new:true}); //new true allows to return the modified document

    query.exec(function (err, match){
        if (err) {
            res.status(500).json({
                text: 'Erreur interne'
            })
        } else {
            res.status(200).json({
                match: match
            })
        }
    })
}

function makeMatch(req, res){ 
    const match = { 
        name: req.body.name,
        status: 'waitingConfirmation',  //between [finished, waitingConfirmation, confirmed, canceled]
        league1Id: req.body.league1Id,
        league2Id: req.body.league2Id,
        league1Members: req.body.league1Members,
        league2Members: req.body.league2Members,
        league1MembersPropositions: [],
        league2MembersPropositions: [],
        referee: null,
        mc: null,
        refereePropositions: [],
        mcPropositions: [],
        admins: [],
        subscribers: [],
        description: req.body.description ? req.body.description : "",
        date: req.body.date, //TO CHECK : how to manage dates request ?
        location: req.body.location,
        score: {score1: 0, score2: 0}
    } ;
    
    const _m = new Match(match);
    _m.save( function (err, match){
        if(err){
            res.status(500).json({
                text: "Erreur interne en essayant de créer le match"
            })
        } else {
            res.status(200).json({
                text: "Succès",
                id: match._id
            })
        }
    });
}

//------ USER IN MATCH ------

/**
 * checks if user has a certain role in match, if no calls next
 */
function hasRole(req, res, next){
    const matchId = req.params.matchId;
    const userId = req.params.userId;
    const role = req.body.role;
    const waiting = req.body.waiting;

    Match.findById(matchId).exec(function(err,match){
        if(err){
            res.status(500).json({text: 'Internal Error'});
            return;
        }
        const field = match.findField(role,waiting);
        var hasRole = false;
        if((role==='referee' || role==="mc") && !waiting){ //fields that are not array
            hasRole = (field.fieldValue === userId)
        }
        else {
            hasRole = field.fieldValue.includes(userId)
        }
        if(hasRole){
            res.status(400).json({
                text: 'User already has this role'
            })
            return;
        }
        else {
            next();
        }
    })
}

/**
 * ajoute un user au match, renvoie un objet {liste: newList} correspond au champ modifié dans l'objet match avec sa nouvelle valeur
 */
function addToMatch(req,res){  
    const matchId = req.params.matchId;
    const userId = req.params.userId;
    const role = req.body.role;
    const waiting = req.body.waiting;
    if(!matchId || !userId){
        res.status(400).json({
            text: 'Missing parameters'
        });
        return;
    }
    Match.findById(matchId).then( 
        function (match, err){
            if(err){
                res.status(404).json({
                    text: 'Match not found',
                    erreur: err
                })
                return;
             }  
            const field = match.findField(role,waiting);
            const infosToUpdate = {};
            if ((role==='referee' || role==='mc') && !waiting){ //only cases where field is not an array
                infosToUpdate[field.fieldName]=userId;
            }
            else { //for fields that are array, we just add the user to the list
                const newField = field.fieldValue;
                newField.push(userId);
                infosToUpdate[field.fieldName]=newField;
            }

            const modifyQuery=Match.findByIdAndUpdate(matchId,infosToUpdate);
            modifyQuery.exec(
                function (error, result){
                    if(error){
                        res.status(500).json({
                            text: 'Erreur interne',
                            erreur: error
                        })
                    } else {
                        res.status(200).json({
                            updates: infosToUpdate
                        })
                    }
                }
            )
        }
    )
}

/**
 * 
 * ajoute un user au match, renvoie un objet {liste: newList} correspond au champ modifié dans l'objet match avec sa nouvelle valeur
 */
function removeFromMatch(req,res){ 
    const matchId = req.params.matchId;
    const userId = req.params.userId;
    const role = req.body.role;
    const waiting = req.body.waiting;
    if(!matchId || !userId){
        res.status(400).json({
            text: 'Missing parameters'
        });
        return;
    }
    const findMatch=Match.findById(matchId)
    findMatch.exec( function (err, match){
            if(err){
                res.status(404).json({
                    text: 'Match not found'
                });
                return;
            }
            var notInRole = true; //true if the user does not have the role we want to remove from him
            const field = match.findField(role,waiting);
            const infosToUpdate = {};
            if ((role==='referee' || role==='mc') && !waiting && field.fieldValue===userId){ //only cases where field is not an array, we only remove if the user to remove from role is indeed the user in role
                infosToUpdate[field.fieldName]=[];
                notInRole = false;
            }
            else { //for fields that are array, we just remove the user from the list
                const newField = field.fieldValue;
                const idx = newField.indexOf(userId);
                if (idx != -1){ //if we did not find the user in the list 
                    newField.splice(idx,1);
                    infosToUpdate[field.fieldName]=newField;
                    notInRole = false;
                }
            }

            if(notInRole){
                res.status(404).json({
                    text: 'User does not have this role',
                })
                return;
            }

            Match.findByIdAndUpdate(matchId,infosToUpdate).then(
            function (result, error){
                if(error){
                    res.status(500).json({
                        text: 'Erreur interne'
                    })
                } else {
                    res.status(200).json({
                        updates: infosToUpdate
                    })
                }
            })
        }
    )
}

/**
 * 
 * Renvoie la liste des matchs dont l'id appartient à req.params.
 */
function getMatchesList(req, res) {
    if (!req.params.matchesIds) {
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        var matchesIds = req.params.matchesIds;
        console.log(Array(matchesIds))
        var findMatches = new Promise(function (resolve, reject) {
            Match.find({
                _id: {$in: matchesIds}, 
            }, function (err, matches) {
                if (err) {
                    reject(500);
                } 
                else {
                    resolve(matches)
                }
            })
        });
        findMatches
            .then(matches => {
                res.status(200).json({
                    "text": "Success",
                    matches : matches
                })
            })
            .catch(err =>{
                res.status(500).json({
                    text : "Erreur interne en récupérant les matchs"
                })
            })
    }
}
    
//-----VALIDATION-----

function validateMatch(req, res, next){
    const match = req.body;
    const result = Validator.validate(match,false);
    if(result.error){ //should be a promise syntax, but didn't work
        res.status(400).json({
            text: "Unfit parameters",
            errorDetail: {name: result.error.name, message: result.error.details[0].message},
            value: result.value
        })
        return;
    }
    next(); //else pass to next middleware
}

function validateMatchRequired(req, res, next){
    const match = req.body;
    const result = Validator.validate(match,true);

    if(result.error){ //should be a promise syntax, but didn't work
        console.log(result.error)
        res.status(400).json({
            text: "Unfit parameters",
            errorDetail: {name: result.error.name, message: result.error.details[0].message},
            value: result.value
        })
        return;
    }
    next(); //else pass to next middleware
}

function validateParamsId(req, res, next){
    
    const result = Validator.validateId(req.params.id);
    if(result.error){ //should be a promise syntax, but didn't work
        res.status(400).json({
            text: "Unfit parameters",
            errorDetail: {name: result.error.name, message: result.error.details[0].message},
            value: result.value
        })
        return;
    }
    next(); //else pass to next middleware
}

function validateBodyUser(req, res, next){
    const body = req.body;
    const result = Validator.validateUser(body);
    if(result.error){ //should be a promise syntax, but didn't work
        res.status(400).json({
            text: "Unfit parameters",
            errorDetail: {name: result.error.name, message: result.error.details[0].message},
            value: result.value
        })
        return;
    }
    next(); //else pass to next middleware
}

function validateParamsUser(req, res, next){
    const matchResult = Validator.validateId(req.params.matchId);
    const userResult = Validator.validateId(req.params.userId);
    if(matchResult.error){
        res.status(400).json({
            text: "Unfit parameters",
            errorDetail: {name: matchResult.error.name, message: matchResult.error.details[0].message},
            value: matchResult.value
        })
        return;
    }

    if(userResult.error){ 
        res.status(400).json({
            text: "Unfit parameters",
            errorDetail: {name: userResult.error.name, message: userResult.error.details[0].message},
            value: userResult.value
        })
        return;
    }

    next();
}

function validateParamsMatchesList(req, res, next){
    const params = req.params;
    const result = Validator.validateMatchesIds(params);
    if(result.error){ //should be a promise syntax, but didn't work
        res.status(400).json({
            text: "Unfit parameters",
            errorDetail: {name: result.error.name, message: result.error.details[0].message},
            value: result.value
        })
        return;
    }
    next(); //else pass to next middleware
}

function isAdminOfMatch(req, res, next){ //gérer cas où il y a id dans les params et où il n'y est pas ? ou 2 trucs différents ?
    const userId = req.params.userId ? req.params.userId : req.session.user._id; //TO CHECK req.session.user._id?
    const matchId = req.params.matchId;
    if(!matchId || !userId){
        res.status(400).json({
            text: "Missing id"
        })
        return;
    }
    const findMatch=Match.findById(matchId)
    findMatch.exec(function(err,match){
        if(err){
            res.status(500).json({
                text:'Internal error'
            });
            return;
        }
        const league1Id = match.league1Id;
        const league2Id = match.league2Id;
        const admins = match.admins;
        if(admins.includes(userId)){
            res.status(200).json({
                admin: true
            })
        }
        //ELSE CHECK IF ADMIN OF LEAGUE1 OR ADMIN OF LEAGUE2 
    })
}

function deleteMatch(req, res){
    Match.findByIdAndDelete(matchId).exec(function(err,result){
        if(err){
            res.status(500).json({text:'Erreur interne'});
            return;
        }
        res.status(200).json({text: "Match successfully deleted"})
    })
}




//-----MIDDLEWARES-----
exports.getAllMatches = getAllMatches;
exports.getMatch = getMatch;
exports.hasRole = hasRole;
exports.patchMatch = patchMatch;
exports.makeMatch = makeMatch;
exports.addToMatch = addToMatch;
exports.removeFromMatch = removeFromMatch;
exports.searchMatch = searchMatch;
exports.getMatchesList = getMatchesList;
exports.deleteMatch = deleteMatch;

//-----VALIDATON-----
exports.validateMatch = validateMatch;
exports.validateMatchRequired = validateMatchRequired;
exports.validateParamsId = validateParamsId;
exports.validateBodyUser = validateBodyUser;
exports.validateParamsUser = validateParamsUser;
exports.validateParamsMatchesList = validateParamsMatchesList