import React from 'react';
import { SearchField } from './SearchField.js';
import { SearchTypeForm } from './SearchTypeForm.js';
import { ResultList } from './ResultList.js';

const fakeDB = {
    users: [
        {first_name: 'Antoine', last_name: 'Piolé', photo_id: '/Users/impro/client/ressources/antoine piole.png', 
        get name() {return this.first_name+' '+this.last_name} },
        {first_name: 'Romeo', last_name: 'Sandoz', photo_id: '/Users/impro/client/ressources/romeo sandoz.png',
        get name() {return (this.first_name+' '+this.last_name)} }
    ],
    leagues : [
        {name: 'Lit de Camp', photo_id: 'https://cdn.viarezo.fr/static/image/137762a9dda440027011d47e5c60c5f0cbc23de102830f09c637e8236dcf4e27.jpg'},
        {name: "ESPCI'OH", photo_id: "/Users/Moi/impro/client/ressources/espci'oh.png"},
        {name: 'Lolita', photo_id:'/Users/Moi/impro/client/ressources/lolita.png'}
    ],
    matchs : [
        {name: 'Match WEI', league_1: 'hey', league_2: 'hey2'}, // ?Q? comment accéder à la liste leagues déf au-dessus ?
        {name: 'Improvisades', league_1: 'hi', league_2: 'hi2'}
    ]
};

export class SearchResultContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            resultType: 'user', //the result from the checkbox form : value in 
            inputQuery: '', //the input in the searchfield
        }
        this.changeInput = this.changeInput.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    changeInput(newQuery){
        this.setState({inputQuery : newQuery}) ;
    }

    changeType(newType){
        this.setState ({resultType : newType});
    }

    /**
     * returns an array of results corresponding to the params
     * @param {*} queryText : the text in the searchfield
     * @param {*} type : type of results searched
     */
    getResults(queryText,type){  
        const resultsKey = type+'s';
        return (
            fakeDB[resultsKey].filter (
                elem => elem.name.toLowerCase().includes(queryText.toLowerCase())                        
            ) //pour l'instant, recherche uniquement par name attribute  
        );
    }


    render(){
        let results = this.getResults(this.state.inputQuery,this.state.resultType); 
        console.log(results);
        return (
            <div className='searchResult'>
                <SearchField changeInput={this.changeInput} value={this.state.inputQuery}/>
                <SearchTypeForm changeType={this.changeType} value={this.state.resultType}/>
                <ResultList results={results} type={this.state.resultType} /> {/* type pourrait être récupéré dans la valeur de results ?*/}
            </div>
        )
    }
}