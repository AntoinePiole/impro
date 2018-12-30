const Validator = require('./matchValidator');
const Match = require ('./matchModel');

function validate(req, res, next){
    const match = req.body.match;
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

function validateRequired(req, res, next){
    const match = req.body.match;
    const result = Validator.validate(match,true);
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

function getMatch(req, res){ //works
    if(!req.params.id){
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
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
}

/**
 * finds the list of matches which names contain the string req.params.queryText
 */
function searchMatch(req, res){ //works
    if (!req.params.queryText){
        res.status(400).json({
            text: "Requête invalide"
        });
        return ;
    }
    const name = req.params.queryText;
    const condition = new RegExp("^.*"+name+".*$","i"); //this is supposed to turn the name parameter into a regexp condition to find all results containing the request
    const query = Match.find(
        {name: condition} //TO DO : THIS PROBABLY DOES NOT WORK : how to use a variable in a regex
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

function patchMatch(req, res){ //works
    if(!req.params.id || !req.body.match){ 
        res.status(400).json({
            text: 'Missing parameters'
        })
    } else {
        const id = req.params.id;
        const query = Match.findByIdAndUpdate(id, req.body.match, {new:true}); //new true allows to return the modified document

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
}

function isMatch(req,res,next){ //works
    if(!req.body.match){
        res.status(400).json({
            text: "Requête invalide"
        })
        return;
    }
    if (!req.body.match.name || !req.body.match.league1Id || !req.body.match.league2Id || !req.body.match.date || !req.body.match.location){ //NB : on peut ou considérer name obligatoire (le cas où le nom n'est pas indiqué doit être traité côté front), ou bien qu'il ne l'est pas (traiter le cas côté back), de même pour description (plus simple)
        //s'il manque une donnée 
        res.status(400).json({
            text: "Requête invalide"
        })
        return;
    }
    next();

}
function makeMatch(req, res){ //works

    const match = { 
        name: req.body.match.name,
        status: 'waitingConfirmation',  //between [finished, waitingConfirmation, confirmed, canceled]
        league1Id: req.body.match.league1Id,
        league2Id: req.body.match.league2Id,
        league1Members: req.body.match.league1Members,
        league2Members: req.body.match.league2Members,
        league1MembersPropositions: [],
        league2MembersPropositions: [],
        referee: null,
        mc: null,
        refereePropositions: [],
        mcPropositions: [],
        admins: [],
        subscribers: [],
        description: req.body.match.description ? req.body.match.description : "",
        date: req.body.match.date, //TO CHECK : how to manage dates request ?
        location: req.body.match.location,
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

/**
 * 
 * ajoute un user au match, renvoie un objet {liste: newList} correspond au champ modifié dans l'objet match avec sa nouvelle valeur
 */
function addToMatch(req,res){ //works 
    const matchId = req.params.matchId;
    const userId = req.params.userId;
    const role = req.body.role;
    const waiting = req.body.waiting;
    if(!matchId || !userId || !role || waiting===undefined){
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
function removeFromMatch(req,res){ //works
    const matchId = req.params.matchId;
    const userId = req.params.userId;
    const role = req.body.role;
    const waiting = req.body.waiting;
    if(!matchId || !userId || !role || waiting===undefined){
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

exports.getMatch = getMatch;
exports.patchMatch = patchMatch;
exports.makeMatch = makeMatch;
exports.addToMatch = addToMatch;
exports.removeFromMatch = removeFromMatch;
exports.isMatch = isMatch;
exports.searchMatch = searchMatch;
exports.validate = validate;
exports.validateRequired = validateRequired;