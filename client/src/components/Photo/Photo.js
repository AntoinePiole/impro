import React from 'react';
import { Image } from "react-bootstrap";
import './Photo.css'

export class Photo extends React.Component{
    render(){
        if (this.props.thumbnail) {
            return(
                <Image src={this.props.src} rounded responsive height="120" width="120"/>
            )
        }
        return (
            <Image src={this.props.src} rounded responsive />
        )
    }
}