import React from 'react';
import { Row, Col } from "react-bootstrap";
import './League.css';
import API from '../../utils/API';
import { UserList } from './UserList';
import { LeagueDisplay } from './LeagueDisplay';
import { LeagueEdit } from './LeagueEdit';
import { MatchSuggestions } from './MatchSuggestions';
import { MatchSuggester } from './MatchSuggester';
import { LeagueJoinRequests } from './LeagueJoinRequests';
import { LeagueNotFound } from './LeagueNotFound';


export class League extends React.Component {
    constructor(props){
        super(props);
        this.state= { 
            id : "",
            name : "",
            nickname : "",
            email: "",
            desc : "",
            sentMatchRequestsIds : [],
            receivedMatchRequestsIds : [], // CHANGE TYPE FROM TRIPLE TO MATCH, MAKE A BACKEND FUNCTION TO GET RECEIVED AND SENT FROM BACK BY CALLING WITH ID
            memberPropositions : [],
            editting : false,
            isAdmin : false,
            isMember : false,
            isLoading : true,
            leagueNotFound : null
        }
        this.handleChange = this.handleChange.bind(this);
        this.setEdittingMode = this.setEdittingMode.bind(this);
        this.setNotEdittingMode = this.setNotEdittingMode.bind(this);
    }

    async componentWillMount () {
        this.id = window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);
        API.getLeagueById(this.id)
            .then(data => {
            var league = data.data.league;
            if (!league) {
                this.setState ({
                    leagueNotFound : true
                })
                return ;
            }
            this.setState ({
                id : this.id,
                name : league.name,
                nickname : league.nickname || "",
                desc : league.desc || "",
                email : league.email || "",
                photoId : league.photoId || "",
                members : league.members || [],
                sentMatchRequestsIds : league.sentMatchRequestsIds|| [],
                receivedMatchRequestsIds : league.receivedMatchRequestsIds|| [],
                memberPropositions: league.memberPropositions|| [],
                editting : false,
                isAdmin : API.isAdminOfLeague(localStorage.getItem("id"), league.members), //true if the connected user is an admin of this league
                isMember : API.isMemberOfLeague(localStorage.getItem("id"), league.members), //true if the connected user is a member of this league
                isLoading : false,
                leagueNotFound : false
            });
        })
        .catch (err => {
            this.setState ({
                leagueNotFound : true
            })
            return ;
        })
    }

    setEdittingMode () {
        this.setState ({
            editting:true
        })
    }
    async setNotEdittingMode () {
        console.log("not editting")
        await this.setState ({
            editting:false
        })
        console.log(this.state.editting)
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        if(this.state.leagueNotFound) { 
            return <LeagueNotFound />
        }
        return (
            <div>
                <Row>
                    <Col>
                    {this.state.editting ?
                        <LeagueEdit className="LeagueEdit" id={this.state.id} name={this.state.name} nickname={this.state.nickname} desc={this.state.desc} email={this.state.email} photoId={this.state.photoId} memberPropositions={this.state.memberPropositions} isAdmin={this.state.isAdmin} isMember={this.state.isMember} handleChange={this.handleChange} setNotEdittingMode={this.setNotEdittingMode}/> 
                    :
                        <LeagueDisplay className="LeagueDisplay" id={this.state.id} name={this.state.name} nickname={this.state.nickname} desc={this.state.desc} email={this.state.email} photoId={this.state.photoId} memberPropositions={this.state.memberPropositions} isAdmin={this.state.isAdmin} isMember={this.state.isMember} isLoading={this.state.isLoading} setEdittingMode={this.setEdittingMode} />
                    }
                    </Col>
                    <Col>
                    <div className="UserList">
                        <UserList id={this.state.id} members={this.state.members} isAdmin={this.state.isAdmin}/>    
                    </div>
                    </Col>
                    {this.state.isAdmin?
                        <Col>
                            <LeagueJoinRequests/>
                        </Col>
                        :null}
                </Row>
                <Row>
                {this.state.isAdmin? //Can see the matches the league suggested if you are an admin of the league
                    <div className="MatchSuggestions">
                        <MatchSuggestions sentMatchRequestsIds={this.state.sentMatchRequestsIds} receivedMatchRequestsIds={this.state.receivedMatchRequestsIds}/>
                    </div>
                :
                    null
                }
                {this.state.isMember? //We can suggest a match only if we aren't members of the league
                    null
                :  
                    <div className="MatchSuggester">
                        <MatchSuggester receivingLeagueId={this.state.id} receivingLeagueName={this.state.nickname || this.state.name} sentMatchRequestsIds={this.state.sentMatchRequestsIds} />
                    </div>
                }
                </Row>
            </div>
        )
    }
}