import React from 'react';
import { UserList } from './UserList';
import { LeagueDisplay } from './LeagueDisplay';
import { LeagueEdit } from './LeagueEdit';
import { MatchSuggestions } from './MatchSuggestions';
import { MatchSuggester } from './MatchSuggester';
import * as moment from 'moment';
import './League.css';


export class League extends React.Component {
    constructor(props){
        super(props);
        this.state= { //Should set id, name, nickname, desc, propositions and suggestions with parameters of the list from back
            id : localStorage.getItem('id'), //
            name : "",
            nickname : "",
            desc : "",
            propositions : [{sendingLeagueId : "1", receivingLeagueId : localStorage.getItem("id"), date : moment("2013-02-08 21:30"), location : "Chez moi ;)"}, // change name to sentMatchRequests
                            {sendingLeagueId : "3", receivingLeagueId : localStorage.getItem("id"), date : moment("2013-02-08 23:30"), location : "Chez toi :3"},
                            {sendingLeagueId : "1", receivingLeagueId : localStorage.getItem("id"), date : moment("2018-10-10 00:00"), location : "Partout"}],
            suggestions : [{sendingLeagueId : localStorage.getItem("id"), receivingLeagueId : "1", date : moment("2013-02-08 21:30"), location : "Chez moi ;)"},  //change name to receivedMatchRequests
                            {sendingLeagueId : localStorage.getItem("id"), receivingLeagueId : "2", date:moment("2013-02-08 23:30"), location:"Chez toi :3"}], // CHANGE TYPE FROM TRIPLE TO REQUEST
            editting : false,
            isAdmin : false,
            isMember : false,
        }
    }

    componentDidMount () {
        this.id=window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);

        this.setState ({
            id : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1),
            editting : false,
            name : "Ligue d'Improvisation Théâtrale dédiée au truc",
            nickname : "Lit de Camp",
            desc : "Ligue d'impro de CentraleSupelec",
        })
        this.setState({
            isAdmin : (window.location.toString().substr(window.location.toString().lastIndexOf("/")+1) === localStorage.getItem('id')), // this is stupid, change it so that we browse the league's users to find out whether the current user if an admin of the league
            isMember : (window.location.toString().substr(window.location.toString().lastIndexOf("/")+1) === localStorage.getItem('id')) // same but only check if it is within the league
        })
        console.log(localStorage.getItem('id'))
    }

    setEdittingMode = event => {
        this.setState ({
            editting:true
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    send = event => {
        this.setState({
            editting:false
        })
    }

    render() {
        return (
            <div>
                {this.state.editting ?
                    <LeagueEdit className="LeagueEdit" id={this.state.id} name={this.state.name} nickname={this.state.nickname} desc={this.state.desc} isAdmin={this.state.isAdmin} handleChange={this.handleChange} send={this.send} /> 
                :
                    <LeagueDisplay className="LeagueDisplay "id={this.state.id} name={this.state.name} nickname={this.state.nickname} desc={this.state.desc} isAdmin={this.state.isAdmin} setEdittingMode={this.setEdittingMode} />
                }
                <div className="UserList">
                    <UserList id={this.state.id} isAdmin={this.state.isAdmin}/>    
                </div>
                {this.state.isAdmin?
                    <div className="MatchSuggestions">
                        <MatchSuggestions propositions={this.state.propositions} suggestions={this.state.suggestions}/>
                    </div>
                :
                    null
                }
                {this.state.isMember?
                    <div className="MatchSuggester">
                        <MatchSuggester receivingLeagueId={this.state.id}/>
                    </div>
                :  
                    <div className="MatchSuggester">
                        <MatchSuggester receivingLeagueId={this.state.id}/>
                    </div>
                }
            </div>
        )
    }
}