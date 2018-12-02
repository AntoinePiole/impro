import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {PlayerResult} from './PlayerResult.js';
/**
 * @property results - list of objects of this type
 */
export class PlayerList extends React.Component {

resultList(){ // returns the list of <searchResultItem /> components to render
        const results = this.props.results;
        const toRender = results.map (result => {
            return <ListGroupItem><PlayerResult user={result}/></ListGroupItem>})
        return (toRender);
    } 

    render(){
        return(
            <ListGroup>
                 {this.resultList()}
            </ListGroup>
        )
    }
}