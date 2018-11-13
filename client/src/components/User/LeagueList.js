import React from 'react';
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import API from '../../utils/API';

export class LeagueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues : [{league : {name : "Lit de Camp", id:"1"}, isAdmin : true}, {league : {name : "Lit deux Camp", id:"2"}, isAdmin : false}]
        }
        this.selectLeague = this.selectLeague.bind(this);
    }

    selectLeague (league) {
        console.log("Going to" + league.league.id);
        window.location="/league/" + league.league.id
        //window.location="/league/"+league.id
    }

    leaveLeague (league) {
        console.log("leave the league")
    }

    render() {
        return (
            <div>
                <h2>
                    Mes ligues
                </h2>
                <ListGroup>
                {this.state.leagues.map((league) => (
                    <ListGroupItem key={league.league.id} >
                        {league.isAdmin?<span className="glyphicon glyphicon-asterisk"></span> : <span className="glyphicon glyphicon-user"></span>} 
                        <a onClick={() => this.selectLeague(league)}>{league.league.name}</a>
                        {<Button className="glyphicon glyphicon-remove" onClick = {() => this.leaveLeague(league)}/>} 
                    </ListGroupItem>
                ))}
                </ListGroup>
            </div>
        )
    }
}