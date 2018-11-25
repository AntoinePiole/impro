import React from 'react';
import { SearchResultItem } from './SearchResultItem/SearchResultItems';

export class ResultList extends React.Component {
//?Q? mettre des params à resultList puis appeler la fonction avec comme params this.props.machin ou direct resultList()
    resultList(){ // returns the list of <searchResultItem /> components to render
        const results = this.props.results;
        const type = this.props.type;
        const toRender = results.map (result => {
            return <SearchResultItem result={result} type={type}/>})
        return (toRender);
    } 

    render(){
        
        return(
            <ul>
                {this.resultList()}
            </ul>
        )
    }
}