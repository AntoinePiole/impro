import React from 'react';

export class PlayerResult extends React.Component{

    render(){
        const user = this.props.user;
        return (
            <div className='userResult'>
                <img src={user.photoId} alt={user.firstName} className='userPicture'/> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{user.firstName + ' '+user.familyName}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}