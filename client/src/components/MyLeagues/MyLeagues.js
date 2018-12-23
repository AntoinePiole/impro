import React from 'react';
import { LeagueList } from '../User/LeagueList';
import './MyLeague.css';


export class MyLeagues extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            id : localStorage.getItem("id")
        }
    }

    componentDidMount () { 
        this.id = localStorage.getItem("id");
    }
    render() {
        return (
            <div className="LeagueList">
                <LeagueList id={this.state.id}/>    
            </div>
        )
    }
}