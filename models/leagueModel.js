const mongoose = require('mongoose');

var leagueModel = mongoose.Schema({
    name : String,
    nickname : String,
    desc : String,
    photoId : String,
    members : [{id:String, isAdmin:Boolean}],
    receivedMatchRequestsIds : [String],
    sentMatchRequestsIds : [String],
    memberPropositions : [String]

	
},{ timestamps: { createdAt: 'created_at' }})


leagueModel.methods = {
}

module.exports = mongoose.model('League', leagueModel);