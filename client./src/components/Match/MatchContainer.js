import React from 'react';
import { TeamContainer } from './MatchComponents/TeamContainer/TeamContainer.js';
import {Description} from './MatchComponents/Description/Description';
import { ModificationButton } from './MatchComponents/ModificationButton/ModificationButton';
import {StaffContainer} from './MatchComponents/StaffContainer/StaffContainer';
import {API} from '../../utils/API.js';

import './MatchContainer.css';

/**
 * @property {match Object} - json object representing the match
 */
export class MatchContainer extends React.Component{
    constructor(props){
        super(props);
        localStorage.setItem('id',2); //TO DELETE (only for test)
        this.state = {
            isModifying: false, //true if page in modification (to display the 'admin page')
            descriptionText: this.props.match.description
        }; 
        this.setDescriptionText = this.setDescriptionText.bind(this);
        this.addToLeague = this.addToLeague.bind(this);
        this.removeFromLeague = this.removeFromLeague.bind(this);
        this.handleModify = this.handleModify.bind(this);

    }
    /**
     * adds a participant to definitive or waiting list for this league/match
     * @param {String} userId 
     * @param {boolean} waiting - true if adding to the waiting list, false if to the definitive
     * @param {number} leagueNumber - 1 or 2, defines which team
     */
    addToLeague(userId,waiting,leagueNumber){
        const role = 'participant' + leagueNumber;
        return API.addToMatch(userId,this.props.matchId, {role: role, waiting: waiting});
    }
    
    /**
     * removes a participant from definitive or waiting list for this league/match
     * @param {String} userId 
     * @param {boolean} waiting - true if adding to the waiting list, false if to the definitive
     * @param {number} leagueNumber - 1 or 2, defines which team
     */
     removeFromLeague(userId,waiting,leagueNumber){
        const role = 'participant' + leagueNumber;
        await API.removeFromMatch(userId,this.props.match.matchId, {role: role, waiting: waiting});
    }

    /**
     * converts a list of members' ids in a list of members
     * @param {id array} userIdList 
     */
    async findUsers(userIdList){
        return userIdList.map(
            async function (userId) {
                const user = await API.getUserById(userId);
                return user;
            }
        )
    }
    
    /**
     * true if user is admin of the league
     * @param {*} leagueId 
     * @param {*} userId 
     */
    async adminLeague(leagueId,userId){
        const league = await API.getLeagueById(leagueId);
        const userLeague = league.members.find ( user => user.id === userId ); 
        if (userLeague) { //if the user is in the league
            return userLeague.admin; // check if he's admin
        }
        return false; 
    }

    /**
     * returns true if user is admin of the match or of one of the leagues playing
     * @property {id} userId
     */
    async isAdmin(userId){
        const match = this.props.match;
        const adminLeague1 = await this.adminLeague(match.league1Id, userId); //true if user is admin of league1
        const adminLeague2 = await this.adminLeague(match.league2Id, userId); //true if user is admin of league2
        const adminMatch = (match.admins.indexOf(userId) != -1); //true if user is admin of the match
        return (adminMatch || adminLeague1 || adminLeague2);
    }

    setDescriptionText(text){
        this.setState({descriptionText: text});
    }

    async handleModify(event){
        if(this.state.isModifying) {
            const text = this.state.descriptionText;
            await API.patchMatch(this.props.match.id,{description: text});
            this.setState({isModifying: false});
        } else {
            if (this.isAdmin(localStorage.getItem('id'))){ //if current user has right to modify match
                this.setState({isModifying: true});
            } 
            else {console.log("Vous n'avez pas les droits pour modifier ce match");}
        }
        
    }

    render(){
        const league1 = await API.getLeagueById(this.props.match.league1Id);
        const league2 = await API.getLeagueById(this.props.match.league2Id);
        const league1Members = await this.findUsers(this.props.match.league1Members);
        const league2Members = await this.findUsers(this.props.match.league2Members);
        const league1MembersPropositions = await this.findUsers(this.props.match.league1MembersPropositions);
        const league2MembersPropositions = await this.findUsers(this.props.match.league2MembersPropositions);
        const refereePropositions = await this.findUsers(this.props.match.refereePropositions);
        const mcPropositions = await this.findUsers(this.props.match.mcPropositions);
        const admin = await this.isAdmin(localStorage.getItem('id'));
        return(
            <div className='matchContainer'>
                <TeamContainer className='league1' league={league1} participants={league1Members} participantsPropositions={league1MembersPropositions} isModifying={this.state.isModifying} addParticipant={(x,y)=> this.addToLeague(x,y,1)} removeParticipant={(x,y)=> this.removeFromLeague(x,y,1)} />
                <span className='VS'>VS</span>
                <TeamContainer className='league2' league={league2} participants={league2Members} participantsPropositions={league2MembersPropositions} isModifying={this.state.isModifying} addParticipant={(x,y)=> this.addToLeague(x,y,2)} removeParticipant={(x,y)=> this.removeFromLeague(x,y,2)} />
                <Description descriptionText={this.state.descriptionText} isModifying={this.state.isModifying} setDescriptionText={this.setDescriptionText} />
                <StaffContainer matchId={this.props.match.id} referee={this.props.referee} mc={this.props.mc} refereePropositions={refereePropositions} mcPropositions={mcPropositions} isModifying={this.state.isModifying}/>
                {admin ? <ModificationButton onClick={this.handleModify} isModifying={this.state.isModifying}/> : null /* modification button, displayed only if current user is admin of the page */}
            
            </div>
        )
    }
}