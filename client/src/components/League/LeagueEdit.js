import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";
import './League.css';


export class LeagueEdit extends React.Component {

    send = event => {
        this.props.send();
    }
    render() {
        //TODO : how to add photos ?
        return (
            <div className="LeagueEdit" >

                <FormGroup controlId="name">
                <ControlLabel>Nom officiel</ControlLabel>
                <FormControl type="text" value={this.props.name} onChange={this.props.handleChange}/>
                </FormGroup>

                <FormGroup controlId="nickname">
                <ControlLabel>Nom usuel</ControlLabel>
                <FormControl type="text" value={this.props.nickname} onChange={this.props.handleChange}/>
                <HelpBlock> Laissez cette case vide si vos noms usuels et officiels sont les mêmes.</HelpBlock>
                </FormGroup>

                <FormGroup controlId="email">
                <ControlLabel>Adresse email de contact</ControlLabel>
                <FormControl type="email" value={this.props.email} onChange={this.props.handleChange}/>
                </FormGroup>

                <FormGroup controlId="desc">
                <ControlLabel>Description</ControlLabel>
                <FormControl type="text" value={this.props.desc} onChange={this.props.handleChange}/>
                </FormGroup>

                <Button className="ValidationButton" onClick={this.props.send} bsSize="large"type="submit">
                    Valider modifications
                </Button>
            </div>
        )
    }
}