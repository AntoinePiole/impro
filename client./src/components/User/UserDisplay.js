import React from 'react';
import { Button } from "react-bootstrap";
import * as moment from 'moment';
import './User.css';


export class UserDisplay extends React.Component {

    send = event => {
        this.props.send();
    }

    render() {
        const birthday = this.props.birthday===""? 'Non renseignée': moment(this.props.birthday).format('DD/MM/YYYY');
        return (
            <div className="User" id="User">
                <h1>Page de {this.props.username? this.props.username : this.props.first_name + ' ' + this.props.last_name}</h1>
                <p> Prénom : {this.props.first_name}</p>
                <p> Nom de famille : {this.props.last_name}</p>
                <p> Date de naissance : {birthday}</p>
                <p> Pseudonyme : {this.props.username===""? 'Non renseigné' : this.props.username}</p>
                <p> Tél. : {this.props.phone===""? 'Non renseigné': this.props.phone}</p>
                <p> Email : {this.props.email===""? 'Non renseigné': this.props.email}</p>
                <p className = 'userDescription'> Bio : {this.props.desc===""? 'Non renseigné': this.props.desc}</p>
                {this.props.id === localStorage.getItem('id')? 
                    <Button onClick={this.props.setEdittingMode} bsSize="large" type="submit">
                        Modifier mon profil
                    </Button>
                : null}
            </div>
        )
    }
}