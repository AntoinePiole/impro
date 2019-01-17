import React from 'react';
import { PlayerResultModifier } from './PlayerResultModifier';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

/**
 * displays the list of players of the team for an admin of the league
 * @property {memberObject array} participantsList
 * @property {memberObject array} waitingList
 * @property {function} addParticipant (userId:String, waiting:boolean) - add a participant for this league, in waiting list or definitive list
 * @property {function} removeParticipant -  (userId:String, waiting:boolean) - removes a participant for this league, in waiting list or definitive list 
 */
export class PlayerListModifier extends React.Component{
    
    participantsList (){
        return this.props.participantsList.map(
            participant => <ListGroupItem><PlayerResultModifier user={participant} waiting={false} removeParticipant={()=>this.props.removeParticipant(participant._id,false)} /></ListGroupItem>
        )
    }

    waitingList (){
        return this.props.waitingList.map(
            waiter => <ListGroupItem><PlayerResultModifier user={waiter} waiting={true} acceptParticipant={()=>this.props.addParticipant(waiter._id,false)} removeParticipant={()=>this.props.removeParticipant(waiter._id,true)}/></ListGroupItem>
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