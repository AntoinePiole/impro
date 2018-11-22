import React from 'react';

export class MatchResult extends React.Component{
    constructor(props){
        super(props);
        this.match = this.props.match;
        this.league1 = this.match.league_1; {/* league should be accessed by its id */}
        this.league2 = this.match.league_2; {/* league should be accessed by its id */}
    }
    
    render(){
        return (
            <div className='matchResult'>
                <h3 className='matchName'>{this.match.name}</h3> {/* Must be styled inline*/}
                <img src={this.league1.photo_id} alt='League 1' className='leaguePicture'/> {/* MODIFY : img src should appear differently than match.photo_id in DB */}
                <span className='vs'>VS</span>
                <img src={this.league2.photo_id} alt='League 2' className='leaguePicture' />
            </div>
        )
    }
}