import React from 'react';
import { PlayerListContainerModifier } from '../Team/PlayerListContainerModifier';

/**
 * @property {league Object} league - json representing league
 * @property {membersObject array} participants - members playing this match with this league
 * @property {membersObject array} participantsPropositions - members who postulated to play this match with this league
 * @property {id} matchId
 */
export class StaffContainerModifier extends React.Component{

    render(){
        return(
            <div className='teamContainer'>
                <h2>Arbitre</h2>
                <PlayerListContainerModifier participantsList={[this.props.referee]} participantsWaitingList={this.props.waitingReferee} addParticipant={this.props.addReferee} removeParticipant={this.props.removeReferee} />
                <h2>MC</h2>
                <PlayerListContainerModifier participantsList={[this.props.mc]} participantsWaitingList={this.props.waitingMc} addParticipant={this.props.addReferee} removeParticipant={this.props.removeReferee} />
            </div>
        )
    }
}