import React from 'react';

export class MatchResult extends React.Component{
    constructor (props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        window.location = '/match/'+this.props.match.id;
    }
    render(){
        const match = this.props.match;
        return (
            <div className='matchResult' onClick = {this.handleClick}> 
                <h3 className='matchName'>{match.name}</h3> {/* Must be styled inline*/}
                <img src={match.league1.photo_id} alt='League 1' className='leaguePicture'/> {/* MODIFY : img src should appear differently than match.photo_id in DB */}
                <span className='vs'>VS</span>
                <img src={match.league2.photo_id} alt='League 2' className='leaguePicture' />
            </div>
        )
    }
}