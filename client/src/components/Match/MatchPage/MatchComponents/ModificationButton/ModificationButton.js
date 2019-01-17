import React from 'react';
import {Button} from 'react-bootstrap';
import API from '../../../../../utils/API';

/**
 * @property {function} onClick - turns the page to modifty mode
 * @property {boolean} isModifying - true if match page currently in modification
 */
export class ModificationButton extends React.Component{
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        window.location = '/matchmodify/'+this.props.matchId;
    }

    render(){
        return (
            <Button onClick={this.handleClick}>Modifier</Button>
        )
    }
}