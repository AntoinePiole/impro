import React from 'react';
import {Button} from 'react-bootstrap';

/**
 * @property {function} onClick - turns the page to modifty mode
 * @property {boolean} isModifying - true if match page currently in modification
 */
export class ModificationButton extends React.Component{

    render(){
        const message = this.props.isModifying ? 'Terminer modifications' : 'Modifier';
        return (
            <Button onClick={this.props.onClick}>{message}</Button>
        )
    }
}