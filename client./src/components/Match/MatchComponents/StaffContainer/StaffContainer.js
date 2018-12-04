import React from 'react';
import {StaffResult} from './Staff/StaffResult';
import {StaffList} from './Staff/StaffList';
import {ParticipationButton} from './Staff/ParticipationButton';
import {API} from '../../../../fakeDB'; //to replace with real API

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
        this.postulateReferee = this.postulateReferee.bind(this);
        this.postulateMc = this.postulateMc.bind(this);
        this.isPostulatingReferee = this.isPostulatingReferee.bind(this);
        this.isPostulatingMc = this.isPostulatingMc.bind(this);

    }
    addReferee(userId){
        API.addToMatch(userId,this.props.matchId,'referee',false);
    }
    addMc(userId){
        API.addToMatch(userId,this.props.matchId,'mc',false);
    }
    removeReferee(userId){
        API.removeFromMatch(userId,this.props.matchId,'referee',true);
    }
    removeMc(userId){
        API.removeFromMatch(userId,this.props.matchId,'mc',true);
    }
    postulateReferee(){
        const userId = localStorage.getItem('id');
        API.addToMatch(userId, this.props.matchId, 'referee', true)
    }
    postulateMc(){
        const userId = localStorage.getItem('id');
        API.addToMatch(userId, this.props.matchId, 'mc', true)
    }
    isPostulatingReferee(){
        return this.props.refereeProposition.includes(localStorage.getItem('id'));
    }
    isPostulatingMc(){
        return this.props.mcProposition.includes(localStorage.getItem('id'));
    }



    render(){
        return(
            <div className='staff'>
                <div className='referee'>
                    <StaffResult result={this.props.referee} />
                    {this.props.isModifying ? <StaffList results={this.props.refereePropositions} addStaffer={this.addReferee} removeStaffer={this.removeReferee}/> : null}
                    <ParticipationButton postulate={this.postulateReferee} cancel={()=>this.removeReferee(localStorage.getItem('id'))} role='arbitre' particpating={this.isPostulatingReferee} />
                </div>
                <div>
                    <StaffResult result={this.props.mc} />
                    {this.props.isModifying ? <StaffList results={this.props.refereePropositions} addStaffer={this.addMc} removeStaffer={this.removeMc}/> : null}
                    <ParticipationButton postulate={this.postulateMc} cancel={()=>this.removeMc(localStorage.getItem('id'))} role='MC' particpating={this.isPostulatingMc} />
                </div>
            </div>
        )
    }
}