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
        this.state= {
            id : localStorage.getItem('id'),
            editting : false,
            name : "",
            nickname : "",
            desc : "",
            isAdmin : false,
            isMember : false,
            propositions : [{leagueId:"1", date:moment("2013-02-08 21:30"), location:"Chez moi ;)"}, {leagueId:"1", date:moment("2013-02-08 23:30"), location:"Chez toi :3"},{leagueId:"2", date:moment("2018-10-10 00:00"), location:"Partout"}],
            suggestions : [{leagueId:"3", date:moment("2013-02-08 21:30"), location:"Chez moi ;)"}, {leagueId:"3", date:moment("2013-02-08 23:30"), location:"Chez toi :3"}]
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
                    null
                :  
                    <div className="MatchSuggester">
                        <MatchSuggester />
                    </div>
                }
            </div>
        )
    }
}