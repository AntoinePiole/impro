import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../../utils/API';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: "",
            cpassword: "",
            firstName: "",
            familyName: "",
            birthay: "",
            error: false
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }
    send = event => {
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0 || this.state.password !== this.state.cpassword){
            return;
        }
        if(!this.state.familyName || !this.state.firstName) {
            return;
        }
        var _send = {
            email: this.state.email,
            password: this.state.password,
            firstName : this.state.firstName,
            familyName : this.state.familyName,
            birthday : this.state.birthday
        }
        API.signup(_send).then(function(data){
            if (data.status === 204) {
                this.setState({
                    error:true
                })
            }
            else {
                console.log(data)
                var id = data.data.session.passport.user;
                var cookie = data.data.session.cookie;
                localStorage.setItem('cookie', cookie);
                localStorage.setItem('id', id)
                window.location = "/home"
            }
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

    render() {
        return(
            //TODO : DISPLAY SOMETHING TO WARN THE USER WHEN THE EMAIL ALREADY EXISTS ( IE WHEN THIS.STATE.ERROR IS TRUE )
            <div className="Login">
                <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl value={this.state.email} onChange={this.handleChange} type="email"/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="cpassword" bsSize="large">
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="firstName" bsSize="large">
                <ControlLabel>Prénom</ControlLabel>
                <FormControl value={this.state.firstName} onChange={this.handleChange} type="text"/>
                </FormGroup>
                <FormGroup controlId="familyName" bsSize="large">
                <ControlLabel>Nom</ControlLabel>
                <FormControl value={this.state.familyName} onChange={this.handleChange} type="text"/>
                </FormGroup>
                <FormGroup controlId="birthday" bsSize="large">
                <ControlLabel>Date de naissance</ControlLabel>
                <FormControl value={this.state.buthday} onChange={this.handleChange} type="date"/>
                </FormGroup>
                <Button
                onClick={this.send}
                block
                bsSize="large"
                type="submit"
                >
                Inscription
                </Button>
            </div>
        )
    }
}