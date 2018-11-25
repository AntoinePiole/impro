import React from 'react';

export class LeagueResult extends React.Component{
    constructor(props){
        super(props);
        this.league = this.props.league;
    }
    
    render(){
        return (
            <div className='leagueResult'>
                <img src={this.league.photo_id} alt='League' className='leaguePicture'/> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{this.league.name}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}