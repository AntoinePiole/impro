import React from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";
import * as moment from 'moment';
import './League.css';

export class MatchSuggestions extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            leagues : [],
            receivedMatches : [],
            sentMatches : []
        }
        this.getLeagueNameById = this.getLeagueNameById.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.removeRequest = this.removeRequest.bind(this);
    }

    getLeagueNameById(id) {
        //TODO when the back is working : adapt this to 
        if (id==="1") {
            return "LDC"
        }
        if (id==="2"){
            return "La voiture"
        }
        if (id==="3"){
            return "Hey c'est nous"
        }
    }

    selectLeague(id){
        window.location = "/league/"+id;
    }

    acceptRequest(matchRequest){
        console.log("accept match request " + matchRequest)
        //Remove request from both leagues, create corresponding match, jump to its page
    }

    removeRequest(matchRequest){
        console.log("remove match request " + matchRequest)
        //Remove it from both leagues, refresh the page
    }

    render() {
        return (
            <div>
                <h2>
                    Les matchs qui vous sont proposés
                </h2>
                <Grid>
                    <Row display="block" className="grid">
                        <Col xs={3} md={3} > <h3>  Avec  </h3>  </Col>
                        <Col xs={3} md={3} > <h3>  Date  </h3>  </Col>
                        <Col xs={3} md={3} > <h3>  Endroit  </h3>  </Col>
                        <Col xs={2} md={1} > <h3>  Accepter  </h3>  </Col>
                        <Col xs={2} md={1} > <h3>  Refuser  </h3>  </Col>
                    </Row>
                {this.props.sentMatchRequestsIds.map((sentMatchRequest) => (
                    <Row key={sentMatchRequest.date+sentMatchRequest.sendingLeagueId} display="block" className="grid">
                        <Col xs={3} md={3} > 
                            <a onClick={ () => this.selectLeague(sentMatchRequest.sendingLeagueId)}>
                                {this.getLeagueNameById(sentMatchRequest.sendingLeagueId)}                        
                            </a>
                        </Col>
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(sentMatchRequest.sendingLeagueId)}>
                                {moment(sentMatchRequest.date).format("DD/MM/YY hh:mm")}                        
                            </a>
                        </Col>
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(sentMatchRequest.sendingLeagueId)}>
                                {sentMatchRequest.location}                        
                            </a>
                        </Col>
                        <Col xs={2} md={1} >
                            <Button className="glyphicon glyphicon-ok" onClick = {() => this.acceptRequest(sentMatchRequest)}/>
                        </Col>
                        <Col xs={2} md={1} >
                            <Button className="glyphicon glyphicon-remove" onClick = {() => this.removeRequest(sentMatchRequest)}/>
                        </Col>
                    </Row>
                ))}
                </Grid>
                <h2>
                    Les matchs que vous avez proposés
                </h2>
                <Grid>
                    <Row display="block" className="grid">
                        <Col xs={3} md={3} > <h3>  Avec  </h3>  </Col>
                        <Col xs={3} md={3} > <h3>  Date  </h3>  </Col>
                        <Col xs={3} md={3} > <h3>  Endroit  </h3>  </Col>
                        <Col xs={2} md={2} > <h3>  Annuler  </h3>  </Col>
                    </Row>
                {this.props.sentMatchRequestsIds.map((sentMatchRequest) => (
                    <Row display="block" key={sentMatchRequest.date+sentMatchRequest.receivingLeagueId} className="grid">
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(sentMatchRequest.receivingLeagueId)}>
                                {this.getLeagueNameById(sentMatchRequest.receivingLeagueId)}                        
                            </a>
                        </Col>
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(sentMatchRequest.receivingLeagueId)}>
                                {moment(sentMatchRequest.date).format("DD/MM/YY hh:mm")}                        
                            </a>
                        </Col>
                        <Col xs={3} md={3} >
                            <a onClick={()=>this.selectLeague(sentMatchRequest.receivingLeagueId)}>
                                {sentMatchRequest.location}                        
                            </a>
                        </Col>
                        <Col xs={2} md={2} >
                            <Button className="glyphicon glyphicon-remove" onClick = {() => this.removeRequest(sentMatchRequest)}/>
                        </Col>
                    </Row>
                ))}
                </Grid>
            </div>
        )
    }
}