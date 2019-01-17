import React from 'react';
import {Button} from 'react-bootstrap';
import API from '../../../../../utils/API';


export class ModificationButtonModifier extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        API.patchMatch(this.props.matchId,{description: this.props.descriptionText}).then(
            res => window.location = '/match/'+this.props.matchId
        ).catch(
            err => console.log(err)
        )
    }

    render(){
        return (
            <Button onClick={this.handleClick}>Enregistrer modifications</Button>
        )
    }
}