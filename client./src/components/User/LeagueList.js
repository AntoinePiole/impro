import React from 'react';
import { ListGroup, ListGroupItem, Button, Row, Col } from "react-bootstrap";
import API from '../../utils/API';
import { LeaguePhoto } from '../League/LeaguePhoto';
import '../League/League.css';

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
        await this.setState({
            leagues : leagues.data.leagues
        })
    }

    componentDidMount () {
        this.rerender()
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs ={12}>
                    <h2>
                        Liste de ligues
                    </h2>
                    </Col>
                </Row>
                <ListGroup>
                {this.state.leagues.map((league) => ( 
                    <ListGroupItem key={league._id} >
                        <Row>
                            <Col md={12}>
                                <LeaguePhoto photoId={league.photoId} thumbnail />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
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
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))}
                </ListGroup>
            </div>
        )
    }
}