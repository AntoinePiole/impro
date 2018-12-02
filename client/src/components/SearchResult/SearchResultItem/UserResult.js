import React from 'react';

export class UserResult extends React.Component{
    
    render(){
        const user = this.props.user;
        return (
            <div className='userResult'>
                <img src={user.photo_id} alt={user.name} className='userPicture'/> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{user.name}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}