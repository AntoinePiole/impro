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
     */
    isAdmin(userId){
        const currentUser = this.props.league.members.find( 
            user => user._id === userId 
        );
        if (currentUser) {return currentUser.isAdmin}
        else {return false};
    }

    /**
     * checks if a user is already participating with this league
     * @param {number} userId
     * @returns {boolean}
     */
    isParticipating(userId){
        return (this.props.participants.some(
            user => user._id === userId)) //if one prticipants has same id
    }

     /**
     * true if user is on the waiting list to play
     * @param {String} userId 
     */
    isWaiting(userId){
        return (this.props.participantsPropositions.indexOf(
            user => user._id === userId
        ) !== -1) ; //supposed to check if one of the elements in array satisfies cb
    }

    isModifying(userId){
        return (this.props.isModifying && this.isAdmin(userId))
    }

    render(){
        const participating = this.isParticipating(localStorage.getItem("id"));
        const waiting = this.isWaiting(localStorage.getItem("id"));
        return(
            <div className='teamContainer'>
                <LeagueInfo league={this.props.league} />
                <PlayerListContainer participantsList={this.props.participants} participantsWaitingList={this.props.participantsPropositions} addParticipant={this.props.addParticipant} removeParticipant={this.props.removeParticipant} isModifying={this.isModifying(localStorage.getItem('id'))}/>
                <TeamJoiningButton isParticipating={participating} isWaiting={waiting} addParticipant={this.props.addParticipant} removeParticipant={this.props.removeParticipant} update={this.render.bind(this)}/>
            </div>
        )
    }
}