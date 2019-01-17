import React from 'react';
import { PlayerListContainerModifier } from '../Team/PlayerListContainerModifier';
import API from '../../../../../utils/API';
/**
 * @property {league Object} league - json representing league
 * @property {membersObject array} participants - members playing this match with this league
 * @property {membersObject array} participantsPropositions - members who postulated to play this match with this league
 * @property {id} matchId
 */
export class StaffContainerModifier extends React.Component{
    constructor(props){
        super(props);
        this.addReferee = this.addReferee.bind(this);
        this.removeReferee = this.removeReferee.bind(this);
        this.addMc = this.addMc.bind(this);
        this.removeMc = this.removeMc.bind(this);

    }
    addReferee(userId, waiting){
        return API.addToMatch(userId, this.props.matchId, {role: 'referee', waiting:waiting})
    }

    removeReferee(userId, waiting){
        return API.removeFromMatch(userId, this.props.matchId, {role: 'referee', waiting:waiting})
    }

    addMc(userId, waiting){
        return API.addToMatch(userId, this.props.matchId, {role: 'mc', waiting:waiting})
    }

    removeMc(userId, waiting){
        return API.removeFromMatch(userId, this.props.matchId, {role: 'mc', waiting:waiting})
    }
    
    render(){
        return(
            <div className='teamContainer'>
                <h2>Arbitre</h2>
                <PlayerListContainerModifier participantsList={[this.props.referee]} participantsWaitingList={this.props.waitingReferee} addParticipant={this.addReferee} removeParticipant={this.removeReferee} />
                <h2>MC</h2>
                <PlayerListContainerModifier participantsList={[this.props.mc]} participantsWaitingList={this.props.waitingMc} addParticipant={this.addMc} removeParticipant={this.removeMc} />
            </div>
        )
    }
}