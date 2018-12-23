import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import './League.css';
import API from '../../utils/API';


export class LeagueMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            nickname: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.makeLeague = this.makeLeague.bind(this);
    }
    makeLeague = event => {
        if(!this.state.name) {
            return;
        }
        var _send = {
            name : this.state.name,
            nickname : this.state.nickname,
            userId : localStorage.getItem("id")
        }
        API.makeLeague(_send)
            .then(res=> {
                console.log(res);
                window.location = "/league/"+ res.data.id;
            })
            .catch(err => console.log(err))
    }    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        return (
            <div className="LeagueMaker" >
                <h2>
                    Création de ligue
                </h2>
                <FormGroup controlId="name">
                    <ControlLabel>Nom officiel</ControlLabel>
                    <FormControl type="text" value={this.props.name} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="nickname">
                    <ControlLabel>Nom usuel (optionnel)</ControlLabel>
                    <FormControl type="text" value={this.props.nickname} onChange={this.handleChange}/>
                </FormGroup>
                <Button className="ValidationButton" onClick={this.makeLeague} bsSize="large"type="submit">
                    Créer ma ligue
                </Button>
            </div>
        )
    }
}