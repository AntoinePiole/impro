import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import API from '../../utils/API';
import Moment from 'moment';
import { LeagueList } from './LeagueList'
import './User.css';


export class User extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            id : localStorage.getItem('id'),
            editting : false,
            email : "",
            first_name : "",
            last_name : "",
            username : "",
            birthday : null,
            phone : "",
            desc : ""
        }
    }

    componentDidMount () {
        this.id=window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);

        this.setState ({
            id : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1),
            editting : false,
            email : "antoine.piole@student.ecp.fr",
            first_name : "Antoine",
            last_name : "Piolé",
            birthday : new Date(),
            username : "",
            phone : '06.52.78.03.66',
            desc : 'Le meilleur improvisateur de toute la Nouvelle-Calédonie'
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
            <div className="border border-dark" id="User">
                {this.state.editting ?
                    <div className="UserDisplay" >
                        <FormGroup controlId="first_name">
                        <ControlLabel>Prénom</ControlLabel>
                        <FormControl type="text" value={this.state.first_name} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="last_name">
                        <ControlLabel>Nom de famille</ControlLabel>
                        <FormControl type="text" value={this.state.last_name} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="username">
                        <ControlLabel>Pseudo</ControlLabel>
                        <FormControl type="text" value={this.state.username} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="email">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl type="email" value={this.state.email} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="phone">
                        <ControlLabel>Tél.</ControlLabel>
                        <FormControl type="text" value={this.state.phone} onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="desc">
                        <ControlLabel>Bio</ControlLabel>
                        <FormControl type="text" value={this.state.desc} onChange={this.handleChange}/>
                        </FormGroup>
                        <p></p>
                        <Button className="ValidationButton" onClick={this.send} bsSize="large"type="submit">
                            Valider modifications
                        </Button>
                    </div>
                :
                    <div className="UserDisplay">
                        <h1>Page de {this.state.username? this.state.username : this.state.first_name + ' ' + this.state.last_name
                            }
                        </h1>
                        <p> Prénom : {this.state.first_name}</p>
                        <p> Nom de famille : {this.state.last_name}</p>
                        <p> Date de naissance : {this.state.birthday===""? 'Non renseignée': Moment(this.state.birthday).format('l')}</p>
                        <p> Pseudonyme : {this.state.username===""? 'Non renseigné' : this.state.username}</p>
                        <p> Tél. : {this.state.phone===""? 'Non renseigné': this.state.phone}</p>
                        <p> Email : {this.state.email===""? 'Non renseigné': this.state.email}</p>
                        <p className = 'userDescription'> Bio : {this.state.desc===""? 'Non renseigné': this.state.desc}</p>
                        {this.state.id === localStorage.getItem('id')? 
                            <Button onClick={this.setEdittingMode} bsSize="large" type="submit">
                                Modifier mon profil
                            </Button>
                        : null}
                    </div>
                }
                <div className="LeagueList">
                    <LeagueList/>    
                </div>
            </div>
        )
    }
}