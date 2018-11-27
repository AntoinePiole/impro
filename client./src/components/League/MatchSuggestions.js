import React from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";
import * as moment from 'moment';
import './League.css';

export class MatchSuggestions extends React.Component {
    constructor(props) {
        super(props);
        this.getLeagueNameById = this.getLeagueNameById.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.removeRequest = this.removeRequest.bind(this);
    }

    getLeagueNameById(id) {
        //TODO when the back is working : adapt this to 
        if (id=="1") {
            return "LDC"
        }
        if (id=="2"){
            return "La voiture"
        }
        if (id=="3"){
            return "Hey c'est nous"
        }
    }

    selectLeague(id){
        window.location = "/league/"+id;
    }

    acceptRequest(proposition){
        console.log("accept proposition " + proposition)
        //Remove request from both leagues, create corresponding match, jump to its page
    }

    removeRequest(proposition){
        console.log("remove proposition " + proposition)
        //Remove it from both leagues, refresh the page
    }

    render() {
        return (
            <div>
                <h2>
                    Propositions de matchs
                </h2>
                <Grid>
                <Row display="block" className="grid">
                        <Col xs={3} md={3} >
                            <h3>
                                Avec
                            </h3>
                        </Col>
                        <Col xs={3} md={3} >
                            <h3>
                                Date
                            </h3>
                        </Col>
                        <Col xs={3} md={3} >
                            <h3>
                                Endroit
                            </h3>
                        </Col>
                        <Col xs={1} md={1} >
                            <h3>
                                Accepter
                            </h3>
                        </Col>
                        <Col xs={1} md={1} >
                            <h3>
                                Refuser
                            </h3>
                        </Col>
                    </Row>
                {this.props.propositions.map((proposition) => (
                    <Row display="block" className="grid">
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(proposition.leagueId)}>
                                {this.getLeagueNameById(proposition.leagueId)}                        
                            </a>
                        </Col>
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(proposition.leagueId)}>
                                {moment(proposition.date).format("DD/MM/YY hh:mm")}                        
                            </a>
                        </Col>
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(proposition.leagueId)}>
                                {proposition.location}                        
                            </a>
                        </Col>
                        <Col xs={1} md={1} >
                            <Button className="glyphicon glyphicon-ok" onClick = {() => this.acceptRequest(proposition)}/>
                        </Col>
                        <Col xs={1} md={1} >
                            <Button className="glyphicon glyphicon-remove" onClick = {() => this.refuseRequest(proposition)}/>
                        </Col>
                    </Row>
                ))}
                </Grid>
                <h2>
                    Vos demandes de matchs
                </h2>
                <Grid>
                <Row display="block" className="grid">
                        <Col xs={3} md={3} >
                            <h3>
                                Avec
                            </h3>
                        </Col>
                        <Col xs={3} md={3} >
                            <h3>
                                Date
                            </h3>
                        </Col>
                        <Col xs={3} md={3} >
                            <h3>
                                Endroit
                            </h3>
                        </Col>
                        <Col xs={2} md={2} >
                            <h3>
                                Annuler
                            </h3>
                        </Col>
                </Row>
                {this.props.suggestions.map((suggestion) => (
                    <Row display="block" className="grid">
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(suggestion.leagueId)}>
                                {this.getLeagueNameById(suggestion.leagueId)}                        
                            </a>
                        </Col>
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(suggestion.leagueId)}>
                                {moment(suggestion.date).format("DD/MM/YY hh:mm")}                        
                            </a>
                        </Col>
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(suggestion.leagueId)}>
                                {suggestion.location}                        
                            </a>
                        </Col>
                        <Col xs={2} md={2} >
                            <Button className="glyphicon glyphicon-remove" onClick = {() => this.refuseRequest(suggestion)}/>
                        </Col>
                    </Row>
                ))}
                </Grid>
            </div>
        )
    }
}