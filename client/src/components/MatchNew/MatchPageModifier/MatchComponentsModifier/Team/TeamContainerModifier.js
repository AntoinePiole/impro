import React from 'react';
import { LeagueInfo } from '../../../MatchPage/MatchComponents/Team/TeamComponents/LeagueInfo';
import { PlayerListContainerModifier } from './PlayerListContainerModifier';

/**
 * @property {league Object} league - json representing league
 * @property {membersObject array} participants - members playing this match with this league
 * @property {membersObject array} participantsPropositions - members who postulated to play this match with this league
 * @property {id} matchId
 */
export class TeamContainerModifier extends React.Component{

    render(){
        return(
            <div className='teamContainer'>
                <LeagueInfo league={this.props.league} />
                <PlayerListContainerModifier participantsList={this.props.participants} participantsWaitingList={this.props.participantsPropositions} addParticipant={this.props.addParticipant} removeParticipant={this.props.removeParticipant} />
            </div>
        )
    }
}