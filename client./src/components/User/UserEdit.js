import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import './User.css';
import API from '../../utils/API';
import ImageUploader from 'react-images-upload';


export class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            picture : null, 
            photoId : this.props.photoId
        }
        this.sendEdittedUser = this.sendEdittedUser.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount () {
        this.setState({
            photoId : this.props.photoId
        })
    }



    sendEdittedUser (firstName, familyName, username, phone, email, desc) {
        var data = {
            firstName : firstName,
            familyName : familyName,
            username: username, 
            phone : phone,
            email : email,
            desc : desc, 
            photoId : this.state.photoId
        }
        this.props.updateUser(data);
    }
/*
    Images aren't uploaded within sendEdittedUser : they are uploaded whenever an user tries to upload a file
    But until they click the "Valider Modifications" button, their photoId parameter isn't changed
*/
    onDrop(picture) {
        this.setState({
            picture: picture
        });
        console.log(picture)
        API.submitImage(this.state.picture).then(function(id) {
            this.setState({
                photoId : id
            })
        })
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
                        <ControlLabel>Nom</ControlLabel>
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

                    <FormGroup controlId="desc">
                        <ControlLabel>Image de profil</ControlLabel>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choisissez une image'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                    </FormGroup>

                    <Button className="ValidationButton" onClick={() => this.sendEdittedUser(this.props.firstName, this.props.familyName, this.props.username, this.props.phone, this.props.email, this.props.desc)} bsSize="large"type="submit">
                        Valider modifications
                    </Button>
                </div>
            </div>
        )
    }
}