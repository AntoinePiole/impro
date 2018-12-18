import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import * as moment from 'moment';
import './User.css';
import { UserPhoto } from './UserPhoto'


export class UserDisplay extends React.Component {

    send = event => {
        this.props.send();
    }

    render() {
        const birthday = this.props.birthday===""? 'Non renseignée': moment(this.props.birthday).format('DD/MM/YYYY');
        return (
            <div className="User" id="User">
                <Row>
                    <Col>
                        <h1>Page de {this.props.username? this.props.username : this.props.firstName + ' ' + this.props.familyName}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <UserPhoto photoId={this.props.photoId} />
                    </Col>
                    <Col>
                        <p> Prénom : {this.props.firstName}</p>
                        <p> Nom de famille : {this.props.familyName}</p>
                        <p> Date de naissance : {birthday}</p>
                        <p> Pseudonyme : {this.props.username===""? 'Non renseigné' : this.props.username}</p>
                        <p> Tél. : {this.props.phone===""? 'Non renseigné': this.props.phone}</p>
                        <p> Email : {this.props.email===""? 'Non renseigné': this.props.email}</p>
                        <p className = 'userDescription'> Bio : {this.props.desc===""? 'Non renseigné': this.props.desc}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.id === localStorage.getItem('id')? 
                                <Button onClick={this.props.setEdittingMode} bsSize="large" type="submit">
                                    Modifier mon profil
                                </Button>
                        : null}
                    </Col>
                </Row>
                
            </div>
        )
    }
}