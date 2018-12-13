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
        this.state= { 
            id : "",
            name : "",
            nickname : "",
            desc : "",
            sentMatchRequestsIds : [],
            receivedMatchRequestsIds : [], // CHANGE TYPE FROM TRIPLE TO MATCH, MAKE A BACKEND FUNCTION TO GET RECEIVED AND SENT FROM BACK BY CALLING WITH ID
            editting : false,
            isAdmin : false,
            isMember : false,
        }
    }

    async componentDidMount () {
        
        this.id = window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);
        var data = await API.getLeagueById(this.id);
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
        this.setState({
            //isAdmin : (this.state.members.some(e => (e.id === localStorage.getItem('id')) && e.isAdmin)), 
            isAdmin : true,
            isMember : (this.state.members.some(e => e.id === localStorage.getItem('id')))
        });
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
            if (data.status != 200) {
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