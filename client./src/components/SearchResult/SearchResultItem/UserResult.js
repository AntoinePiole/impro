import React from 'react';

export class UserResult extends React.Component{
    constructor(props){
        super(props);
        this.user = this.props.user;
    }
    
    render(){
        return (
            <div className='userResult'>
                <img src={this.user.photo_id} alt={this.user.name} className='userPicture'/> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{this.user.first_name+' '+this.user.last_name}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}