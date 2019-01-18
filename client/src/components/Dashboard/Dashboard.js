import React from 'react';
import { Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { Title } from "./Title"
import API from '../../utils/API';

export class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.disconnect.bind(this);
        this.home.bind(this);
        this.user.bind(this);
        this.myLeagues.bind(this);
        this.search.bind(this);
    }

    home = event => {
        window.location = "/home";
    }
    user = event => {
        window.location = "/user/"+localStorage.getItem('id');
    }
    myLeagues = event => {
        window.location = "/myleagues/";
    }
    makeLeague = event => {
        window.location = "/newleague"
    }
    search = event => {
        window.location = "/search";
    }
    disconnect = event => {
        API.logout().then(
            res => window.location = "/login"
        ).catch(
            err => console.log(err)
        )
    }
    login = event => {
        window.location = "/login";
    }

    render() {
        if (API.isAuth()) {
            return(
                <div className="Dashboard">
                    <Title/>
                    <Row>
                        <Col xs={12}>
                            <ButtonGroup className="Button" bsSize="large">
                                    <Button onClick={this.home}>Ecran d'acceuil</Button>
                                    <Button onClick={this.user}>Mon profil</Button>
                                    <Button onClick={this.myLeagues}>Mes ligues</Button>
                                    <Button onClick={this.makeLeague}>Créer une ligue</Button>
                                    <Button onClick={this.search}>Recherche</Button>
                                    <Button onClick={this.disconnect}>Déconnexion</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </div>
            )
        }
        else {
            return(
                <div className="Dashboard">
                    <Title/>
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={8}>
                            <ButtonGroup className="Button" bsSize="large">
                                <Button onClick={this.home}>Ecran d'acceuil</Button>
                                <Button onClick={this.search}>Recherche</Button>
                                <Button onClick={this.login}>Se connecter</Button>
                            </ButtonGroup>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                </div>
            )
        }
    }
}