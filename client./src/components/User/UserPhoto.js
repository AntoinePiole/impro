import React from 'react';
import { Image } from "react-bootstrap";

export class UserPhoto extends React.Component{

    render(){
        return (
            <div>
                {this.props.photoId ?
                    <Image src={this.props.photoId} rounded />
                :
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRWyUBf6bIbL_cQpQ5d2R4nBl0OUgS-Q-lGCPSA6bJy9wNr9u" rounded /> //location of default user photo
                }
            </div>
        )
    }
}