import React from 'react';
import {Button} from 'react-bootstrap';
import {UserPhoto} from '../../../../User/UserPhoto';
/**
 * @property {memberObject} result
 * @property {function} removeStaffer
 * @property {function} addStaffer
 */
export class StaffResultAdmin extends React.Component{

    addStaffer (){
        this.props.addStaffer(this.props.result._id);
    }

    removeStaffer(){
        this.props.removeStaffer(this.props.result._id);
    }

render(){
        const user = this.props.result;
        return (
            <div>
                <UserPhoto photoId={user.photoId} /> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{user.firstName+' '+user.familyName}</h3> {/* Must be styled inline*/}
                <Button onClick={this.removeStaffer} className='delete'>Delete</Button>
                <Button onClick={this.addStaffer} className='accept'>Valider</Button>  {/* TODO : empêcher les gens de re-cliquer, IL FAUDRAIT QUE LE ONCLICK RE-RENDER LES LISTES DE PARTICIPANTS*/}
            </div>
        )
    }
}
