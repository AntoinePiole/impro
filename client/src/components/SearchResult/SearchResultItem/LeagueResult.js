import React from 'react';

export class LeagueResult extends React.Component{
    constructor (props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        window.location = '/league/'+this.props.league.id;
    }

    render(){
        const league = this.props.league;
        return (
            <div className='leagueResult' onClick = {this.handleClick}>
                <img src={league.photo_id} alt='League' className='leaguePicture'/> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{league.name}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}