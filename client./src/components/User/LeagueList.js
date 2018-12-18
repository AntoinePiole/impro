import React from 'react';
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import API from '../../utils/API';

export class LeagueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues : []
        } 
        this.selectLeague = this.selectLeague.bind(this);
    }

    selectLeague (league) {
        console.log("Going to" + league.league.id);
        window.location="/league/" + league.league.id
    }

    leaveLeague (league) {
        console.log("leave the league", league)
    }

    async componentDidMount () {
        var leagues = await API.getLeaguesOfUser(this.props.id);
        leagues = leagues.data.leagues,
        this.setState({
            leagues : leagues
        })
    }

    render() {
        return (
            <div>
                <h2>
                    Mes ligues
                </h2>
                <ListGroup>
                {this.state.leagues.map((league) => ( // Not a function ? But it IS in the state, as an array
                    <ListGroupItem key={league.league.id} >
                        {league.isAdmin?<span className="glyphicon glyphicon-asterisk"></span> : <span className="glyphicon glyphicon-user"></span>} 
                        <a onClick={() => this.selectLeague(league)}>{league.league.name}</a>
                        {localStorage.getItem("id") === this.props.id?
                            <Button className="glyphicon glyphicon-remove" onClick = {() => this.leaveLeague(league)}/>
                        :
                            null 
                        }
                    </ListGroupItem>
                ))}
                </ListGroup>
            </div>
        )
    }
}