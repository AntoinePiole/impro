import React from 'react';
import {LeaguePhoto} from '../../../../../League/LeaguePhoto';

/**
 * @property {object} league - the league object this describes
 */
export class LeagueInfo extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        window.location = "/league/"+this.props.league._id;
    }

    
    render(){
        const league = this.props.league;
        return (
            <div onClick={this.handleClick}>
                <LeaguePhoto photoId={league.photoId}  />
                <h2>{league.name}</h2>
            </div>
        )
    }
}