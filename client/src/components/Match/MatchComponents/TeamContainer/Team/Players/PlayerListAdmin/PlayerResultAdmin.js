import React from 'react';
import { Button } from 'react-bootstrap';



/**
 * @property {userObject} user
 * @property {boolean} waiting
 * @property {function} acceptParticipant - adds this user to the definitive team for this match and league
 * @property {function} removeParticipant - removes this user from the definitive team or waiting list for this match and league

 */
export class PlayerResultAdmin extends React.Component{

    render(){
        const user = this.props.user;
        return (
            <div>
                <img src={user.photoId} alt={user.firstName} className='userPicture'/> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{user.firstName+' '+user.familyName}</h3> {/* Must be styled inline*/}
                <Button onClick={this.props.removeParticipant} className='delete'>Delete</Button>
                {this.props.waiting ? <Button onClick={this.props.addParticipant} className='accept'>Valider</Button> : null}  {/* NB IL FAUDRAIT QUE LE ONCLICK RE-RENDER LES LISTES DE PARTICIPANTS*/}
            </div>
        )
    }
}