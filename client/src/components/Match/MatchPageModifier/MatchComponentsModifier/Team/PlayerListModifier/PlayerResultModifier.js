import React from 'react';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { UserPhoto } from '../../../../../User/UserPhoto';


/**
 * @property {userObject} user
 * @property {boolean} waiting
 * @property {function} acceptParticipant - adds this user to the definitive team for this match and league
 * @property {function} removeParticipant - removes this user from the definitive team or waiting list for this match and league

 */
export class PlayerResultModifier extends React.Component{

    constructor(props){
        super(props);
        this.state = {modified:false}; //true if modified (i.e participant removed or added)

        this.addParticipant = this.addParticipant.bind(this);
        this.removeParticipant = this.removeParticipant.bind(this);
    }

    addParticipant(){
        const added = this.props.acceptParticipant(); //promise resolved when participant added to definitive list
        const removed = this.props.removeParticipant(); //promise resolved when participant removed of waiting list
        Promise.all([added,removed]).then(
            result => this.setState({modified:true})
        ).catch(
            err => console.log(err)
        )
    }

    removeParticipant(){
        this.props.removeParticipant().then(
            this.setState({modified:true})
        ).catch(
            err => console.log(err)
        )
    }

    render(){
        var user = this.props.user;
        
        if(!user){
            return <h2>Personne ici !</h2>
        }
        
        return (
            this.state.modified ? 
            <div>
                <UserPhoto photoId={user.photoId} /> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{user.firstName +' '+ user.familyName}</h3> {/* Must be styled inline*/}
                <Alert>Modification enregistrée</Alert>
            </div>
            :
            <div>
                <UserPhoto photoId={user.photoId} /> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{user.firstName +' '+ user.familyName}</h3> {/* Must be styled inline*/}
                <Button onClick={this.removeParticipant} className='delete'>Delete</Button>
                {this.props.waiting ? <Button onClick={this.addParticipant} className='accept'>Valider</Button> : null}  {/* NB IL FAUDRAIT QUE LE ONCLICK RE-RENDER LES LISTES DE PARTICIPANTS*/}
            </div> 
        )
    }
}