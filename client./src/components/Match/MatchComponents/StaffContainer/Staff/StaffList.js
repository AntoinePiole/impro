import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {StaffResultAdmin} from './StaffResultAdmin';
/**
 * @property {function} addStaffer
 * @property {function} removeStaffer
 * @property {memberObject array} results
 */
export class StaffList extends React.Component{

    toRender(){
        this.props.results.map(
            result => <ListGroupItem><StaffResultAdmin addStaffer={this.props.addStaffer} removeStaffer={this.props.removeStaffer} result={result} /></ListGroupItem>
        )
    }

    render(){
        return (
            <ListGroup>
                {this.toRender()}
            </ListGroup>
        )
    }
}