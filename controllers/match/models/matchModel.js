const mongoose = require ('mongoose');

var matchModel = mongoose.Schema({
    name: String,
    status: String,  //between [finished, waitingConfirmation, confirmed, canceled]
    league1Id: String,
    league2Id: String,
    league1Members: [String],
    league2Members: [String],
    league1MembersPropositions: [String],
    league2MembersPropositions: [String],
    referee: String,
    mc: String,
    refereePropositions: [String],
    mcPropositions: [String],
    admins: [String],
    subscribers: [String],
    description: String,
    date: Date,
    location: String,
    score: Object
})

matchModel.methods = {

    /**
     * returns the corresponding field as {fieldName:name, fieldValue:value}
     */
    findField(role, waiting){ 
        if (waiting){
            switch (role) { // Role can be : "participant1" (player for league1), "participant2"(player for league2), "admin", "referee" or "MC"
                case 'participant1': return {fieldName:'league1MembersPropositions', fieldValue:this.league1MembersPropositions}; 
                case 'participant2': return {fieldName:'league2MembersPropositions', fieldValue: this.league2MembersPropositions}; 
                case 'admin': return {fieldName:'admins', fieldValue: this.admins}; 
                case 'referee': return {fieldName:'refereePropositions', fieldValue: this.refereePropositions}; 
                case 'mc': return {fieldName:'mcPropositions', fieldValue: this.mcPropositions}; 
                default : return new Error ('Not a valid role');
            }
        } else {
            switch (role) { // Role can be : "participant1" (player for league1), "participant2"(player for league2), "admin", "referee" or "MC"
                case 'participant1': return {fieldName: 'league1Members', fieldValue: this.league1Members}
                case 'participant2': return {fieldName: 'league2Members', fieldValue: this.league2Members}; 
                case 'admin': return {fieldName: 'admins', fieldValue: this.admins}; 
                case 'referee': return {fieldName: 'referee', fieldValue: this.referee}; 
                case 'mc': return {fieldName: 'mc', fieldValue: this.mc}; 
                default : return new Error('Not a valid role');
            }
        }
    }
}

module.exports = mongoose.model('Match',matchModel);