import React from 'react';
import { Image } from "react-bootstrap";

export class LeaguePhoto extends React.Component{

    render(){
        return (
            <div>
                {this.props.photoId ?
                    <Image src={this.props.photoId} rounded thumbnail={this.props.thumbnail} />
                :
                    <Image src="https://wiki.diasporafoundation.org/images/7/70/Emoji.png" rounded thumbnail={this.props.thumbnail}/> //location of default photo
                }
            </div>
        )
    }
}