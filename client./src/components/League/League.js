import React from 'react';
import { UserList } from './UserList'
import { LeagueDisplay } from './LeagueDisplay'
import { LeagueEdit } from './LeagueEdit'
import './League.css';


export class League extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            id : localStorage.getItem('id'),
            editting : false,
            name : "",
            nickname : "",
            desc : "",
            isAdmin : false

        }
    }

    componentDidMount () {
        this.id=window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);

        this.setState ({
            id : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1),
            editting : false,
            name : "Ligue d'Improvisation Théâtrale dédiée au truc",
            nickname : "Lit de Camp",
            desc : "Ligue d'impro de CentraleSupelec",
        })
        this.setState({
            isAdmin : (window.location.toString().substr(window.location.toString().lastIndexOf("/")+1) === localStorage.getItem('id')) // this is stupid, change it so that we browse the league's users to find out whether the current user if an admin of the list
        })
        console.log(localStorage.getItem('id'))
    }

    setEdittingMode = event => {
        this.setState ({
            editting:true
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    send = event => {
        this.setState({
            editting:false
        })
    }

    render() {
        return (
            <div className="League">
                {this.state.editting ?
                    <LeagueEdit id={this.state.id} name={this.state.name} nickname={this.state.nickname} desc={this.state.desc} isAdmin={this.state.isAdmin} handleChange={this.handleChange} send={this.send} /> 
                :
                    <LeagueDisplay id={this.state.id} name={this.state.name} nickname={this.state.nickname} desc={this.state.desc} isAdmin={this.state.isAdmin} setEdittingMode={this.setEdittingMode} />
                }
                <div className="UserList">
                    <UserList id={this.state.id} isAdmin={this.state.isAdmin}/>    
                </div>
            </div>
        )
    }
}