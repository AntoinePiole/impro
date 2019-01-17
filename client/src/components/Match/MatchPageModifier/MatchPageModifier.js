import React from 'react';
import { MatchContainerModifier } from './MatchContainerModifier';
import {NotFound} from '../../NotFound/NotFound';
import API from '../../../utils/API';

export class MatchPageModifier extends React.Component{
    
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
        return (match ? <MatchContainerModifier match={match} /> : <NotFound />)
    }
}