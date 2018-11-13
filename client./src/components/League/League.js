import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import API from '../../utils/API';
import Moment from 'moment';
import { UserList } from './UserList'
import './League.css';


export class League extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            id : localStorage.getItem('id'),
            editting : false,
            name : "",
            nickname : "",
            desc : ""
        }
    }

    componentDidMount () {
        this.id=window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);

        this.setState ({
            id : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1),
            editting : false,
            name : "Ligue d'Improvisation Théâtrale dédiée au truc",
            nickname : "Lit de Camp",
            desc : "Ligue d'impro de CentraleSupelec"
        })
        Moment.locale('fr');
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

    send = event => {
        this.setState({
            editting:false
        })
    }
    render() {
        return (
            <div className="League" id="League">
                {this.state.editting ?
                    <div className="LeagueDisplay" >

                        <FormGroup controlId="name">
                        <ControlLabel>Nom officiel</ControlLabel>
                        <FormControl type="text" value={this.state.name} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="nickname">
                        <ControlLabel>Nom usuel</ControlLabel>
                        <FormControl type="text" value={this.state.nickname} onChange={this.handleChange}/>
                        <HelpBlock> Laissez cette case vide si vos noms usuels et officiels sont les mêmes.</HelpBlock>
                        </FormGroup>

                        <FormGroup controlId="desc">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl type="text" value={this.state.desc} onChange={this.handleChange}/>
                        </FormGroup>
                        <p></p>
                        <Button className="ValidationButton" onClick={this.send} bsSize="large"type="submit">
                            Valider modifications
                        </Button>
                    </div>
                :
                    <div className="LeagueDisplay">
                        <h1>{this.state.nickname? this.state.nickname:this.state.name}</h1>
                        {this.state.nickname !== "" ?
                            <span>
                                <p> Nom officiel : {this.state.name}</p>
                                <p> Nom usuel : {this.state.nickname}</p>
                            </span>
                        :
                            <p> Nom  : {this.state.name}</p>
                        }
                        <p className = 'leagueDescription'> Description : {this.state.desc}</p>
                        {this.state.id === localStorage.getItem('id')?              //This is quite stupid here : we show the button to edit the league if the logged user's id and the league's id are the same, for easier testing. Replace this test later : should be shown iff the logged user is an admin of the league
                            <Button onClick={this.setEdittingMode} bsSize="large" type="submit">
                                Modifier ma ligue
                            </Button>
                        : null}
                    </div>
                }
                <div className="UserList">
                    <UserList/>    
                </div>
        </div>
        )
    }
}