import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import './User.css';
import API from '../../utils/API';


export class UserEdit extends React.Component {

    send (firstName, familyName, username, phone, email, desc) {
        var data = {
            firstName : firstName,
            familyName : familyName,
            username: username, 
            phone : phone,
            email : email,
            desc : desc
        }
        API.signup(data);
        
    }

    render() {
        return (
            <div className="User" id="User">
                <div className="UserDisplay" >
                    <FormGroup controlId="firstName">
                    <ControlLabel>Prénom</ControlLabel>
                    <FormControl type="text" value={this.props.firstName} onChange={this.props.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="familyName">
                    <ControlLabel>Nom de famille</ControlLabel>
                    <FormControl type="text" value={this.props.familyName} onChange={this.props.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="username">
                    <ControlLabel>Pseudo</ControlLabel>
                    <FormControl type="text" value={this.props.username} onChange={this.props.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="email">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="email" value={this.props.email} onChange={this.props.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="phone">
                    <ControlLabel>Tél.</ControlLabel>
                    <FormControl type="text" value={this.props.phone} onChange={this.props.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="desc">
                    <ControlLabel>Bio</ControlLabel>
                    <FormControl type="text" value={this.props.desc} onChange={this.props.handleChange}/>
                    </FormGroup>
                    <p></p>
                    <Button className="ValidationButton" onClick={this.send(this.props.firstName, this.props.familyName, this.props.username, this.props.email, this.props.phone, this.props.desc)} bsSize="large"type="submit">
                        Valider modifications
                    </Button>
                </div>
            </div>
        )
    }
}