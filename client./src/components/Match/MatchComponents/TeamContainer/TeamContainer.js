import React from 'react';
import { LeagueInfo } from './Team/LeagueInfo';
import { TeamJoiningButton } from './Team/TeamJoiningButton';
import { PlayerListContainer } from './Team/Players/PlayerListContainer';
import './TeamContainer.css';

/**
 * @property {league Object} league - json representing league
 * @property {membersObject array} participants - members playing this match with this league
 * @property {membersObject array} participantsPropositions - members who postulated to play this match with this league
 * @property {function} addParticipant (userId:String,waiting:boolean) - add a participant for this league, in waiting list or definitive list
 * @property {function} removeParticipant -  (userId:String,waiting:boolean) - removes a participant for this league, in waiting list or definitive list 
 */
export class TeamContainer extends React.Component{

    /**
     * returns true if user is admin of this league
     * @param {} userId 
     */id
    isAdmin(userId){
        console.log(userId);
        const currentUser = this.props.league.members.find( 
            user => user.id == userId //TODO à remplacer par un ===
        );
        if (currentUser) {return currentUser.admin}
        else {return false};
    }

    isModifying(userId){
        return (this.props.isModifying && this.isAdmin(userId))
    }

    render(){
        return(
            <div className='teamContainer'>
                <LeagueInfo league={this.props.league} />
                <PlayerListContainer participantsList={this.props.participants} participantsWaitingList={this.props.participantsPropositions} addParticipant={this.props.addParticipant} removeParticipant={this.props.removeParticipant} isModifying={this.isModifying(localStorage.getItem('id'))}/>
                <TeamJoiningButton league={this.props.league} participantsList={this.props.participants} waitingList={this.props.participantsPropositions} addParticipant={this.props.addParticipant} removeParticipant={this.props.removeParticipant}/>
            </div>
        )
    }
}