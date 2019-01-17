import React from 'react';
import {Button} from 'react-bootstrap';
import API from '../../../../../utils/API';

export class DeleteButton extends React.Component{

    handleClick(event){
        API.cancelMatch(this.props.matchId).then(
            res => window.location = '/home'
        ).catch(
            err => console.log(err)
        )
    }

    render(){
        return (
            <Button onClick={this.props.onClick}>ANNULER MATCH</Button>
        )
    }
}