import React from 'react';
import { Button } from 'react-bootstrap';
import { PlayerList } from './PlayerList/PlayerList.js';
import { PlayerListAdmin } from './PlayerListAdmin/PlayerListAdmin';
import './PlayerListContainer.css';

/**
 * @property {boolean} isModifying- true if page in modification mode
 * @property {userObject array} participantsList - list of league members playing this mach with this league
 * @property {userObject array} participantsWaitingList - list of league members who asked to play this mach with this league
 * @property {function} addParticipant (userId:String,waiting:boolean) - add a participant for this league, in waiting list or definitive list
 * @property {function} removeParticipant -  (userId:String,waiting:boolean) - removes a participant for this league, in waiting list or definitive list 
 */
export class PlayerListContainer extends React.Component {

    constructor (props){
        super (props);
        this.state = {displayParticipants: false};
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event){
        this.setState({displayParticipants : !this.state.displayParticipants});
    }

    toRender(){ //bind?
        return (this.props.isModifying ? 
            <PlayerListAdmin participantsList={this.props.participantsList} waitingList={this.props.participantsWaitingList} addParticipant={this.props.addParticipant} removeParticipant={this.props.removeParticipant} className='participantList' /> :
            <PlayerList results={this.props.participantsList} className='participantList' />
        );
    }


    render(){
        const arrowDown = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Octicons-triangle-down.svg/768px-Octicons-triangle-down.svg.png'; //logo of an arrow pointing down
        const arrowUp = 'https://cdn4.iconfinder.com/data/icons/geomicons/32/672416-triangle-up-512.png'; //logo of an arrow pointing up    
        const buttonImage = this.state.displayParticipants ? arrowDown:arrowUp;
        return (
            <div>
                <h2>Participants</h2>
                <span><Button className='showParticipants' onClick={this.handleClick}><img src={buttonImage}/></Button></span>
                {this.state.displayParticipants ?
                    <div className = 'participants'>
                        {this.toRender()}
                    </div>
                    : null
                }
            </div>
        )
    }
}