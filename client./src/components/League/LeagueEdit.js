import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import './League.css';
import API from '../../utils/API';


export class LeagueEdit extends React.Component {
    constructor(props){
        super(props);
        this.updateLeague = this.updateLeague.bind(this);
    }

    updateLeague = event => {
        var league = {
            name : this.props.name,
            nickname : this.props.nickname,
            email: this.props.email,
            desc: this.props.desc
        }
        if(league.name === ""){
            return;
        }
        API.patchLeague(this.props.id, league).then(function(data){
            console.log(data)
            this.props.setNotEdittingMode();
        })
    }

    render() {
        return (
            <div className="LeagueEdit" >

                <FormGroup controlId="name">
                <ControlLabel>Nom officiel</ControlLabel>
                <FormControl type="text" value={this.props.name} onChange={event => this.props.handleChange(event)}/>
                </FormGroup>

                <FormGroup controlId="nickname">
                <ControlLabel>Nom usuel</ControlLabel>
                <FormControl type="text" value={this.props.nickname} onChange={event => this.props.handleChange(event)}/>
                <HelpBlock> Laissez cette case vide si vos noms usuels et officiels sont les mêmes.</HelpBlock>
                </FormGroup>

                <FormGroup controlId="email">
                <ControlLabel>Adresse email de contact</ControlLabel>
                <FormControl type="text" value={this.props.email} onChange={event => this.props.handleChange(event)}/>
                </FormGroup>

                <FormGroup controlId="desc">
                <ControlLabel>Description</ControlLabel>
                <FormControl type="text" value={this.props.desc} onChange={event => this.props.handleChange(event)}/>
                </FormGroup>

                <Button className="ValidationButton" onClick={this.updateLeague} bsSize="large"type="submit">
                    Valider modifications
                </Button>
            </div>
        )
    }
}