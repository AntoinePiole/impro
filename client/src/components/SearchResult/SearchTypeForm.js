import React from 'react';
import { resultTypes } from './SearchResultItem/SearchResultItems.js';


export class SearchTypeForm extends React.Component{
    
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

   /**
    * change la valeur de state.type dans Search Result Container
    * @param {*} e 
    */
    handleChange(e){
        e.preventDefault();
        this.props.changeType(e.target.value); 
    }

    listOfOptions (){
        return (
            resultTypes.map( type => <option value={type}>{type}</option> ) 
        )
    }

    render(){
        return(
            <select onChange={this.handleChange} value={this.props.value}>
                {this.listOfOptions()}
            </select>
        )
    }
}