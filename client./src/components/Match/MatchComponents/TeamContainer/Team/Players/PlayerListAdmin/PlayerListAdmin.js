import React from 'react';
import { PlayerResultAdmin } from './PlayerResultAdmin';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import './PlayerListAdmin.css';
/**
 * displays the list of players of the team for an admin of the league
 * @property {memberObject array} participantsList
 * @property {memberObject array} waitingList
 * @property {function} addParticipant (userId:String, waiting:boolean) - add a participant for this league, in waiting list or definitive list
 * @property {function} removeParticipant -  (userId:String, waiting:boolean) - removes a participant for this league, in waiting list or definitive list 
 */
export class PlayerListAdmin extends React.Component{
    
    participantsList (){
        return this.props.participantsList.map(
            participant => <ListGroupItem><PlayerResultAdmin user={participant} waiting={false} acceptParticipant={()=>this.props.addParticipant(participant.id,false)} removeParticipant={()=>this.props.removeParticipant(participant.id,false)} /></ListGroupItem>
        )
    }

    waitingList (){
        return this.props.waitingList.map(
            waiter => <ListGroupItem><PlayerResultAdmin user={waiter} waiting={true} acceptParticipant={()=>this.props.addParticipant(waiter.id,true)} removeParticipant={()=>this.props.removeParticipant(waiter.id,true)}/></ListGroupItem>
        )
    }

    render(){
        return(
            <div>
                <ListGroup className='participantsList'>
                    {this.participantsList()}
                </ListGroup>
                <ListGroup className='waitingList'>
                    {this.waitingList()}
                </ListGroup>
            </div>
        )
    }
}