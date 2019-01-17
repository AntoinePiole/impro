import React from 'react';
import { Photo } from "../Photo/Photo"

export class LeaguePhoto extends React.Component{
    render(){
        if(!this.props.photoId) {
            return (
                <Photo src="/default/default_league.png" thumbnail={this.props.thumbnail}/>
            )
        }
        else {
            var regex = /\\/gi
            var path = "/uploads/" + this.props.photoId.replace(regex, '/')
            return (
                <Photo src={path} thumbnail={this.props.thumbnail}/>
            )
        }
    }
}