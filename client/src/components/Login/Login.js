import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../../utils/API';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: "",
            retrieving: false
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    componentDidMount () {
        this.setState ({
            retrieving : false
        })
        console.log("should work")
    }
        
    

    send = event => {
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0){
            return;
        }
        API.login(this.state.email, this.state.password).then(function(data){
            localStorage.setItem('token', data.data.token);
            window.location = "/dashboard"
        },function(error){
            console.log(error);
            return;
        })
    }    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleForgottenPassword = event => {
        this.setState({
            retrieving : true
        })
    }
    handleNewAccount = event => {
        window.location = "/signup"
    }

    handleRetrieve = event => {
        console.log("TODO option to retrieve password")
    }

    
    handleRetrieveChange = event => {
        this.setState({ email: event.target.email });
    }

    back = event => {
        this.setState({
            retrieving: false
        })
    }


    render() {
        if (!this.state.retrieving) {
            return (
                <div className="Login">
                    <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                    </FormGroup>
                    <Button onClick={this.send} block bsSize="large"type="submit">
                        Connexion
                    </Button>
                    <Button onClick={this.handleForgottenPassword} bsSize="large" type="submit">
                        Mot de passe oublié ?
                    </Button>
        
                    <Button onClick={this.handleNewAccount} bsSize="large" type="submit">
                        Créer un compte
                    </Button>
                </div>
            )
        }
        else {
            return (
                <div className="Login">
                    
                    <FormGroup
                        controlId="formBasicText"
                    >
                    <ControlLabel>Récupération de mot de passe</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.email?this.state.email:null}
                        placeholder="Entrez votre adresse mail"
                        onChange={this.handleRetrieveChange}
                    />
                    <FormControl.Feedback />
                    </FormGroup>
            
                    <Button onClick={this.back} bsSize="large" type="submit">
                        Revenir en arrière
                    </Button>
                    
                    <Button onClick={this.handledRetrieve} bsSize="large" type="submit">
                        Récupérer mot de passe
                    </Button>
        
        
                </div>
            )
        }
    }
}