import React from 'react';
import { LeaguePhoto } from "../../League/LeaguePhoto";

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
                <LeaguePhoto photoId={league.photoId} />
                <h3 className='userName'>{league.name}</h3> {/* Must be styled inline*/}
            </div>
        )
    }
}