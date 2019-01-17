import React from 'react';
import {UserPhoto} from '../../../../../../User/UserPhoto';

export class PlayerResult extends React.Component{

    render(){
        const user = this.props.user;
        return (
            <div className='userResult'>
                <UserPhoto photoId={user.photoId} /> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{user.firstName + ' '+user.familyName}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}