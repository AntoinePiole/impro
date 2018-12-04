import React from 'react';
import { Button } from 'react-bootstrap';
import { match } from '../../../../../fakeDB';

/**
 * @property {id array} participantsList - id of the users participating with this league
 * @property {id array} waitingList - id of the users waiting to play with this league
 * @property {league Object} league 
 */
export class TeamJoiningButton extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            participating : this.isParticipating(localStorage.getItem('id')), //true if current user participates with this team
            waiting: this.isWaiting(localStorage.getItem('id'))  //true if current user is in waiting list with this team
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        const userId = localStorage.getItem('id');
        if (this.state.participating){
            this.props.removeParticipant(userId,false); //removes the user from definitive list
            this.setState({participating: false, waiting:false})
            console.log("Ne participe plus!");
            console.log(match.league1MembersPropositions);
            return;
        }
        if (this.state.waiting){
            this.props.removeParticipant(userId,true); //removes the user from waiting list
            this.setState({participating: false, waiting:false})
            console.log("N'est plus sur liste d'attente!");
            console.log(match.league1MembersPropositions);
            return;
        }
        this.props.addParticipant(userId,true); //adds the user to the waiting list
        this.setState({participating: false, waiting:true});
        console.log("Mis sur liste d'attente!");
        console.log(match.league1MembersPropositions);
    }

    /**
     * checks if a user is already participating with this league
     * @param {number} userId
     * @returns {boolean}
     */
    isParticipating(userId){
        return this.props.participantsList.includes(userId);
    }

    /**
     * true if user is on the waiting list to play
     * @param {String} userId 
     */
    isWaiting(userId){
        return this.props.waitingList.includes(userId);
    }

    message(){
        if (this.state.participating){return "Ne plus participer"};
        if (this.state.waiting){return "Ne plus attendre"}
        return "Participer";
    }

    render(){
        return <Button onClick={this.handleClick}>{this.message()}</Button>;
    }
}