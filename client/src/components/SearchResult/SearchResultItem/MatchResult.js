import React from 'react';
import API from "../../../utils/API";
import {LeaguePhoto} from "../../League/LeaguePhoto";

const undefinedUrl = "https://tse4.mm.bing.net/th?id=OIP.uuozcv3Qr6SXQRpBP9V7UQHaE7&pid=Api";
export class MatchResult extends React.Component{
    constructor (props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {league1: null, league2: null};
    }

    handleClick () {
        window.location = '/match/'+this.props.match._id;
    }

    componentDidMount(){ //to initialize values of league1, league2
        const self = this;
        Promise.all([API.getLeagueById(this.props.match.league1Id), API.getLeagueById(this.props.match.league2Id)]).then(
            function(leagues,err){
                if(err){ //TO DO : how to handle the case where we don't find leagues in DB ?
                    const league = {photoId: null} 
                    console.log(err);
                    this.setState({
                        league1: league,
                        league2: league
                    })
                    return;
                }
                const league1 = leagues[0].data.league;
                const league2 = leagues[1].data.league;
                self.setState({
                    league1: league1,
                    league2: league2
                })
            }
        )
    }

    render(){
        const photo1Id = this.state.league1 ? this.state.league1.photoId : null;
        const photo2Id = this.state.league2 ? this.state.league2.photoId : null;
        const match = this.props.match;
        return (
            <div className='matchResult' onClick = {this.handleClick}> 
                <h3 className='matchName'>{match.name}</h3> {/* Must be styled inline*/}
                <LeaguePhoto photoId={photo1Id} /> 
                <span className='vs'>VS</span>
                <LeaguePhoto photoId={photo2Id} />
            </div>
        )
    }
}