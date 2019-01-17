import React from 'react';
import { MatchContainer } from './MatchContainer';
import {NotFound} from '../../NotFound/NotFound';
import API from '../../../utils/API';

export class MatchPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {match:null}
    }

    componentDidMount(){
        const id = window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);
        API.getMatchById(id).then(
            result => this.setState({match: result.data.match})
        ).catch(
            err => console.log(err)
        )
    }
    
    render(){
        const match = this.state.match;
        return (match ? <MatchContainer match={match} /> : <NotFound />)
    }
}