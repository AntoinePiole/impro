import React from 'react';
import { LeagueInfo } from './TeamComponents/LeagueInfo';
import { JoiningButton } from '../JoiningButton/JoiningButton';
import { PlayerList } from './PlayerList';

/**
 * @property {league Object} league - json representing league
 * @property {membersObject array} participants - members playing this match with this league
 * @property {membersObject array} waiting - true if current user is waiting with this league
 * @property {function} addParticipant (userId:String,waiting:boolean) - add a participant for this league, in waiting list or definitive list
 * @property {function} removeParticipant -  (userId:String,waiting:boolean) - removes a participant for this league, in waiting list or definitive list 
 */
export class TeamContainer extends React.Component{

    /**
     * checks if a user is already participating with this league
     * @param {number} userId
     * @returns {boolean}
     */
    isParticipating(userId){
        return (this.props.participants.some(
            user => user._id === userId)) //if one prticipants has same id
    }

    isMemberLeague(){
        if (this.props.league.members) {
            return (this.props.league.members.some(
                member => member._id === localStorage.getItem('id')
            ));
        }
        else {
            return false;
        }
    }

    render(){
        const participating = this.isParticipating(localStorage.getItem("id"));
        const waiting = this.props.waiting;
        return(
            <div className='teamContainer'>
                <LeagueInfo league={this.props.league} />
                <PlayerList participantsList={this.props.participants} />
                {this.isMemberLeague() ? <JoiningButton isParticipating={participating} isWaiting={waiting} addParticipant={this.props.addParticipant} removeParticipant={this.props.removeParticipant} update={this.props.update}/> : null}
            </div>
        )
    }
}