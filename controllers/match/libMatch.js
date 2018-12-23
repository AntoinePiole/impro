const Match = require ('../../models/matchModel');

function getMatch(req, res){
    if(!req.params.id){
        res.status(400).json({
            text: "Requête invalide"
        })
    } else {
        const _id = req.params.id;
        const query = Match.findOne({_id: _id});

        query.exec(function (err, match){
            if(err){
                res.status(500).json({
                    text: "Erreur interne"
                })
            } else {
                res.status(200).json({
                    match: match
                })
            }
        })
    }
}

function patchMatch(req, res){ //TO ASK : Je vérifie manuellement que req.body est bien ?
    if(!req.params.id ){
        res.status(400).json({
            text: 'Requête invalide'
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

function makeMatch(req, res){
    if (!req.body.match.name || !req.body.match.league1Id || !req.body.match.league2Id || !req.body.match.date || !req.body.match.location){ //NB : on peut ou considérer name obligatoire (le cas où le nom n'est pas indiqué doit être traité côté front), ou bien qu'il ne l'est pas (traiter le cas côté back), de même pour description (plus simple)
        //s'il manque une donnée 
        res.status(400).json({
            text: "Requête invalide"
        })
    }
    else {
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
        _m.save(function (err, match){
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
}

/**
 * 
 * ajoute un user au match, renvoie un objet {liste: newList} correspond au champ modifié dans l'objet match avec sa nouvelle valeur
 */
function addToMatch(req,res){
    const matchId = req.params.matchId;
    const userId = req.params.userId;
    const role = req.body.role;
    const waiting = req.body.waiting;
    Match.findById(matchId).then( 
        function (err, match){
            if(err){
                res.status(404).json({
                    text: 'Match not found'
                })
            } else {
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

                Match.findByIdAndUpdate(matchId,infosToUpdate).then(
                    function (error, result){
                        if(error){
                            res.status(500).json({
                                text: 'Erreur interne'
                            })
                        } else {
                            res.status(200).json({
                                updates: infosToUpdate
                            })
                        }
                    }
                )
            }
        }
    )
}

/**
 * 
 * ajoute un user au match, renvoie un objet {liste: newList} correspond au champ modifié dans l'objet match avec sa nouvelle valeur
 */
function removeFromMatch(req,res,next){
    const matchId = req.params.matchId;
    const userId = req.params.userId;
    const role = req.body.role;
    const waiting = req.body.waiting;
    Match.findById(matchId).then( 
        function (err, match){
            if(err){
                res.status(404).json({
                    text: 'Match not found'
                })
            } else {
                var notInRole = true; //true if the user does not have the role we want to remove from him
                const field = match.findField(role,waiting);
                const infosToUpdate = {};
                if ((role==='referee' || role==='mc') && !waiting && field.fieldValue===userId){ //only cases where field is not an array, we only remove if the user to remove from role is indeed the user in role
                    infosToUpdate[field.fieldName]=[];
                    notInRole = false;
                }
                else { //for fields that are array, we just remove the user from the list
                    const newField = field.fieldValue;
                    const idx = fieldValue.indexOf(userId);
                    if (idx === -1){ //if we did not find the user in the list 
                        newField.splice(idx,1);
                        infosToUpdate[field.fieldName]=newField;
                    }
                    else {
                        notInRole = false;
                    }
                }

                if(notInRole){
                    res.status(404).json({
                        text: 'User does not have this role'
                    })
                } else {
                    Match.findByIdAndUpdate(matchId,infosToUpdate).then(
                        function (error, result){
                            if(error){
                                res.status(500).json({
                                    text: 'Erreur interne'
                                })
                            } else {
                                res.status(200).json({
                                    updates: infosToUpdate
                                })
                            }
                        }
                    )
                }
            }
        }
    )
}

exports.getMatch = getMatch;
exports.patchMatch = patchMatch;
exports.makeMatch = makeMatch;
exports.addToMatch = addToMatch;
exports.removeFromMatch = removeFromMatch;
