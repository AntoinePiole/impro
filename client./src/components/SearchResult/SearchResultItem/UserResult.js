import React from 'react';
import { UserPhoto } from "../../User/UserPhoto";

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
                <UserPhoto photoId={user.photoId} />
                <h3 className='userName'>{user.name}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}