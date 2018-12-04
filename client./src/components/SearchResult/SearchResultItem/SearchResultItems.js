//une des lignes résultat sur la page de résultats recherche
import React from 'react';
import {UserResult} from './UserResult';
import {LeagueResult} from './LeagueResult';
import {MatchResult} from './MatchResult';

export const resultTypes = ['user', 'league', 'match'];

/**
 * @property result - object 
 * @property type {string} - type of the result (one of {resultTypes} items)
 */
export class SearchResultItem extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        window.location = "/" + this.props.type + this.props.result.id;
    }

    render(){
        switch (this.props.type){
            case 'user': 
                return <UserResult user={this.props.result} />
            case 'league':
                return <LeagueResult league={this.props.result} />
            case 'match':
                return <MatchResult match={this.props.result} />
        }
    }
}