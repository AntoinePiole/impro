import React from 'react';
import { Button } from 'react-bootstrap';
import { match } from '../../../../../fakeDB';

/**
 * @property {boolean} isParticipating
 * @property {boolean} isWaiting
 * @property {function} addParticipant - (userId, waiting) => Promise
 * @property {function} removeParticipant - (userId, waiting) => Promise
 * @property {function} update - the render method of its parent (TeamContainer)
 */
export class JoiningButton extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isParticipating: false,
            isWaiting: false
        }
    }

    handleClick(event){
        const userId = localStorage.getItem('id');
        const update = this.props.update;
        if (this.props.isParticipating){
            this.props.removeParticipant(userId,false).then( //removes the user from definitive list
                result => {
                    console.log("Ne participe plus!");
                    console.log(match.league1MembersPropositions);
                    update();
                }).catch(
                    err => console.log(err)
                )
                return;
        }
        if (this.props.isWaiting){
            this.props.removeParticipant(userId,true).then( //removes the user from waiting list
                result => {
                    console.log("N'est plus sur liste d'attente!");
                    console.log(match.league1MembersPropositions);
                    update();
                }).catch(
                    err => console.log(err)
                )
            return;
        }
        this.props.addParticipant(userId,true).then( //adds the user to the waiting list
            result => {
                console.log("Mis sur liste d'attente!");
                console.log(match.league1MembersPropositions);
                update()
            }
        ).catch(
            err => console.log(err)
        )
    }

    message(){
        if (this.props.isParticipating){return "Ne plus participer"};
        if (this.props.isWaiting){return "Ne plus attendre"}
        return "Participer";
    }

    render(){
        return <Button onClick={this.handleClick}>{this.message()}</Button>;
    }
}