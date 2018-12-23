import React from 'react';
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import API from '../../utils/API';
import { LeaguePhoto } from '../League/LeaguePhoto';

export class LeagueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues : []
        } 
        this.selectLeague = this.selectLeague.bind(this);
        this.leaveLeague = this.leaveLeague.bind(this);
        this.rerender = this.rerender.bind(this);
    }

    selectLeague (league) {
        console.log("Going to" + league._id);
        window.location="/league/" + league._id
    }

    leaveLeague (league) {
        API.removeFromLeague(this.props.id, league._id).then(
            res => console.log(res)
        )
        this.rerender();
    }

    async rerender() {
        var leagues = await API.getLeaguesOfUser(this.props.id);
        leagues = leagues.data.leagues,
        await this.setState({
            leagues : leagues
        })
    }

    componentDidMount () {
        this.rerender()
    }

    render() {
        return (
            <div>
                <h2>
                    Liste de ligues
                </h2>
                <ListGroup>
                {this.state.leagues.map((league) => ( 
                    <ListGroupItem key={league._id} >
                        <div>
                            <LeaguePhoto photoId = {league.photoId} thumbnail={true} />
                        </div>
                        {API.isAdminOfLeague(this.props.id, league.members) ?
                            <span className="glyphicon glyphicon-asterisk"></span>
                        : 
                            <span className="glyphicon glyphicon-user"></span>} 
                        <a onClick={() => this.selectLeague(league)}>{league.name}</a>
                        {API.isMemberOfLeague(this.props.id, league.members) ?
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