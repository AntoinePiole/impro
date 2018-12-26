import React from 'react';
import { SearchResultItem } from './SearchResultItem/SearchResultItems';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

/**
 * @property type {string} - type of the result (user, league or match)
 * @property results - list of objects of this type
 */
export class ResultList extends React.Component {
//?Q? mettre des params à resultList puis appeler la fonction avec comme params this.props.machin ou direct resultList()

    resultList(){ // returns the list of <searchResultItem /> components to render

        const results = this.props.results;
        if(results.length===0){ //if there are no results
            return (<ListGroupItem>Cette recherche ne correspond à rien de connu</ListGroupItem>) 
        }
        const type = this.props.type;
        const toRender = results.map (result => {
            return <ListGroupItem><SearchResultItem result={result} type={type}/></ListGroupItem>})
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