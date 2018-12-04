import React from 'react';
import './LeagueInfo.css';

/**
 * @property {object} league - the league object this describes
 */
export class LeagueInfo extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        window.location = "/league/"+this.props.league.id;
    }

    
    render(){
        const league = this.props.league;
        return (
            <div>
                <img src={league.photoId} alt='League' onClick={this.handleClick} className='leagueLogo'/>
                <h2>{league.name}</h2>
            </div>
        )
    }
}