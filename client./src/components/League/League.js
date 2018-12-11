import React from 'react';
import { UserList } from './UserList';
import { LeagueDisplay } from './LeagueDisplay';
import { LeagueEdit } from './LeagueEdit';
import { MatchSuggestions } from './MatchSuggestions';
import { MatchSuggester } from './MatchSuggester';
import * as moment from 'moment';
import './League.css';
import API from '../../utils/API';


export class League extends React.Component {
    constructor(props){
        super(props);
        this.state= { //Should set id, name, nickname, desc, sentMatchRequestsIds and suggestions with parameters of the list from back
            id : localStorage.getItem('id'), //
            name : "",
            nickname : "",
            desc : "",
            sentMatchRequestsIds : [{sendingLeagueId : "1", receivingLeagueId : localStorage.getItem("id"), date : moment("2013-02-08 21:30"), location : "Chez moi ;)"}, // change name to sentMatchRequests
                            {sendingLeagueId : "3", receivingLeagueId : localStorage.getItem("id"), date : moment("2013-02-08 23:30"), location : "Chez toi :3"},
                            {sendingLeagueId : "1", receivingLeagueId : localStorage.getItem("id"), date : moment("2018-10-10 00:00"), location : "Partout"}],
            suggestions : [{sendingLeagueId : localStorage.getItem("id"), receivingLeagueId : "1", date : moment("2013-02-08 21:30"), location : "Chez moi ;)"},  //change name to receivedMatchRequests
                            {sendingLeagueId : localStorage.getItem("id"), receivingLeagueId : "2", date:moment("2013-02-08 23:30"), location:"Chez toi :3"}], // CHANGE TYPE FROM TRIPLE TO REQUEST
            editting : false,
            isAdmin : false,
            isMember : false,
        }
    }

    async componentDidMount () {
        
        this.id = window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);
        var data = await API.getLeagueById(this.id);
        console.log(data); //TODOOOO
        var league = data.data.league;
        this.setState ({
            id : league._id,
            name : league.name,
            nickname : league.nickname,
            desc : league.desc,
            email : league.email,
            photoId : league.photoId,
            members : league.members,
            receivedMatchRequestsIds : league.receivedMatchRequestsIds,
            sentMatchRequestsIds : league.sentMatchRequestsIds,
            editting : false,
        });
        console.log(this.state);
        console.log(this.state.members);
        console.log(localStorage.getItem('id'));
        this.setState({
            //isAdmin : (this.state.members.some(e => (e.id === localStorage.getItem('id')) && e.isAdmin)), 
            isAdmin : true,
            isMember : (this.state.members.some(e => e.id === localStorage.getItem('id')))
        });
        console.log("and now, " , this.state);
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

    send (_send) { //Need to test ya
        if(_send.name === ""){
            return;
        }
        API.makeLeague(_send).then(function(data){
            if (data.status === 204) {
                console.log("meh");
            }
            else {
                window.location = "/league/"+data.data.id
            }
        },function(error){
            console.log(error);
            return;
        })
    }

    render() {
        return (
            <div>
                {this.state.editting ?
                    <LeagueEdit className="LeagueEdit" id={this.state.id} name={this.state.name} nickname={this.state.nickname} desc={this.state.desc} email={this.state.email} photoId={this.state.photoId} isAdmin={this.state.isAdmin} handleChange={this.handleChange} send={this.send} /> 
                :
                    <LeagueDisplay className="LeagueDisplay" id={this.state.id} name={this.state.name} nickname={this.state.nickname} desc={this.state.desc} email={this.state.email} photoId={this.state.photoId} isAdmin={this.state.isAdmin} setEdittingMode={this.setEdittingMode} />
                }
                <div className="UserList">
                    <UserList id={this.state.id} isAdmin={this.state.isAdmin}/>    
                </div>
                {this.state.isAdmin? //Can see the matches the league suggested if you are an admin of the league
                    <div className="MatchSuggestions">
                        <MatchSuggestions sentMatchRequestsIds={this.state.sentMatchRequestsIds} suggestions={this.state.suggestions}/>
                    </div>
                :
                    null
                }
                {this.state.isMember? //We can suggest a match only if we aren't members of the league
                    null
                :  
                    <div className="MatchSuggester">
                        <MatchSuggester receivingLeagueId={this.state.id}/>
                    </div>
                }
            </div>
        )
    }
}