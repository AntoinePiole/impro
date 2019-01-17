import React from 'react';
import { UserPhoto } from "../../User/UserPhoto";

export class UserResult extends React.Component{
    constructor (props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        window.location = '/user/'+this.props.user._id;
    }
    
    render(){
        const user = this.props.user;
        if(user){
            return (
                <div className='userResult' onClick = {this.handleClick}>
                    <UserPhoto photoId={user.photoId} />
                    <h3 className='userName'>{user.username}</h3>
                </div>
            )
        }
        else {
            return(
                <div>
                    <UserPhoto photoId={null} />
                    <h3 className='userName'>User 404</h3>
                </div>
                )
        }
    }
}