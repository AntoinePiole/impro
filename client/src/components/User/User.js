import React from 'react';
import * as moment from 'moment';
import { LeagueList } from './LeagueList'
import { UserEdit } from './UserEdit'
import { UserDisplay } from './UserDisplay'
import './User.css';


export class User extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            id : localStorage.getItem('id'),
            editting : false,
            email : "",
            first_name : "",
            last_name : "",
            username : "",
            birthday : null,
            phone : "",
            desc : ""
        }
    }

    componentDidMount () {
        this.id=window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);

        this.setState ({
            id : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1),
            editting : false,
            email : "antoine.piole@student.ecp.fr",
            first_name : "Antoine",
            last_name : "Piolé",
            birthday : new Date(),
            username : "",
            phone : '06.52.78.03.66',
            desc : 'Le meilleur improvisateur de toute la Nouvelle-Calédonie'
        })
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
        const birthday = this.state.birthday===""? 'Non renseignée': moment(this.state.birthday).format('DD/MM/YYYY');
        return (
            <div className="User">
                {this.state.editting ?
                    <UserEdit id={this.state.id} email={this.state.email} first_name={this.state.first_name} last_name={this.state.last_name} username={this.state.username} birthday={birthday} phone={this.state.phone} desc={this.state.desc} handleChange={this.handleChange} send={this.send} /> 
                :
                    <UserDisplay id={this.state.id} email={this.state.email} first_name={this.state.first_name} last_name={this.state.last_name} username={this.state.username} birthday={birthday} phone={this.state.phone} desc={this.state.desc} setEdittingMode={this.setEdittingMode} />
                }
                <div className="LeagueList">
                    <LeagueList/>    
                </div>
            </div>
        )
    }
}