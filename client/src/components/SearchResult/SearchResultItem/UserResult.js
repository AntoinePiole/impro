import React from 'react';

export class UserResult extends React.Component{
    constructor (props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        window.location = '/user/'+this.props.user.id;
    }
    
    render(){
        const user = this.props.user;
        return (
            <div className='userResult' onClick = {this.handleClick}>
                <img src={user.photo_id} alt={user.name} className='userPicture'/> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{user.name}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}