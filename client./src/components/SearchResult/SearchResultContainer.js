import React from 'react';
import { SearchField } from './SearchField.js';
import { SearchTypeForm } from './SearchTypeForm.js';
import { ResultList } from './ResultList.js';
import API from '../../utils/API';

export class SearchResultContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            resultType: 'user', //the result from the checkbox form : value in 
            inputQuery: '', //the input in the searchfield
            results:[] //the case results: undefined is handled in <ResultList>
        }
        this.changeInput = this.changeInput.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    /**
     * called when new search text is submitted
     * @param {*} newQuery 
     */
    changeInput(newQuery){
        this.setState({inputQuery : newQuery}) ;
        const self = this; //allows to use this inside callback of then
        API.search(newQuery,this.state.resultType).then(
            function (resultsData, err){
                if(err){
                    self.setState({results:[]});
                    return;
                }
                const results = resultsData.data.results;
                self.setState({results:results});
            }
        )
    }

    /**
     * called when new type of results is selected
     * @param {*} newType 
     */
    changeType(newType){
        this.setState ({resultType : newType});
        const self = this; //allows to use this inside callback of then
        API.search(this.state.inputQuery, newType).then(
            function (resultsData, err){
                if(err){
                    self.setState({results:[]});
                    return;
                }
                const results = resultsData.data.results;
                self.setState({results:results});
            }
        )
    }

    render(){
        return (
            <div className='searchResult'>
                <SearchField changeInput={this.changeInput} value={this.state.inputQuery}/>
                <SearchTypeForm changeType={this.changeType} value={this.state.resultType}/>
                <ResultList results={this.state.results} type={this.state.resultType} /> {/* type pourrait être récupéré dans la valeur de results ?*/}
            </div>
        ) 
    }
}