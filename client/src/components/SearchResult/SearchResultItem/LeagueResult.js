import React from 'react';

export class LeagueResult extends React.Component{

    render(){
        const league = this.props.league;
        return (
            <div className='leagueResult'>
                <img src={league.photo_id} alt='League' className='leaguePicture'/> {/* MODIFY : img src should appear differently than user.photo_id in DB */}
                <h3 className='userName'>{league.name}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}