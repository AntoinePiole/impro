import React from 'react';
import {UserResult} from '../../../../SearchResult/SearchResultItem/UserResult';
import {JoiningButton} from '../JoiningButton/JoiningButton';
import API from '../../../../../utils/API';

/**
 * displays the mc and referee, and allows to modify them if admin
 * @property {id} matchId
 * @property {memberObject} referee 
 * @property {memberObject} mc
 * @property {memberObject Array} refereePropositions 
 * @property {memberObject Array} mcPropositions
 * @property {boolean} isModifying
 */
export class StaffContainer extends React.Component{

    constructor(props){
        super(props);
        this.addReferee = this.addReferee.bind(this);
        this.addMc = this.addMc.bind(this);
        this.removeReferee = this.removeReferee.bind(this);
        this.removeMc = this.removeMc.bind(this);
    }
    addReferee(userId,waiting){
        return API.addToMatch(userId,this.props.matchId,{role:'referee', waiting:waiting});
    }
    addMc(userId,waiting){
        return API.addToMatch(userId,this.props.matchId,{role: 'mc', waiting: waiting});
    }
    removeReferee(userId,waiting){
        return API.removeFromMatch(userId,this.props.matchId,{role:'referee', waiting:waiting});
    }
    removeMc(userId,waiting){
        return API.removeFromMatch(userId,this.props.matchId,{role:'mc', waiting:waiting});
    }

    render(){
        const participatingReferee = this.props.referee ? (this.props.referee._id === localStorage.getItem('id')) : false; //true if current user is referee
        const participatingMc = this.props.mc ? (this.props.mc._id === localStorage.getItem('id')) : false;
        return(
            <div className='staff'>
                <div className='referee'>
                    <UserResult result={this.props.referee} />
                    <JoiningButton addParticipant={this.addReferee} removeParticipant={this.removeReferee} isParticpating={participatingReferee} isWaiting={this.props.waitingReferee} update={this.render.bind(this)} />
                </div>
                <div>
                    <UserResult result={this.props.mc} />
                    <JoiningButton addParticipant={this.addMc} removeParticipant={this.removeMc} isParticpating={participatingMc} isWaiting={this.props.waitingMc} update={this.render.bind(this)}/>
                </div>
            </div>
        )
    }
}