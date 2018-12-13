import React from 'react';
import * as moment from 'moment';
import { LeagueList } from './LeagueList'
import { UserEdit } from './UserEdit'
import { UserDisplay } from './UserDisplay'
import './User.css';
import API from '../../utils/API';


export class User extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            id : localStorage.getItem('id'),
            editting : false,
            email : "",
            firstName : "",
            familyName : "",
            username : "",
            birthday : "",
            phone : "",
            desc : ""
        }
    }

    async componentDidMount () { // This is not working. Should it be placed somewhere else ?
        this.id=window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);
        var data = await API.getUserById(this.id);
        var user=data.data.user;
        this.setState ({
            id : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1),
            editting : false,
            email : user.email,
            firstName : user.firstName,
            familyName : user.familyName,
            birthday : user.birthday, //Need to make sure this works
            username : user.username,
            phone : user.phone,
            desc : user.desc
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
                    <UserEdit id={this.state.id} email={this.state.email} firstName={this.state.firstName} familyName={this.state.familyName} username={this.state.username} birthday={birthday} phone={this.state.phone} desc={this.state.desc} handleChange={this.handleChange} send={this.send} /> 
                :
                    <UserDisplay id={this.state.id} email={this.state.email} firstName={this.state.firstName} familyName={this.state.familyName} username={this.state.username} birthday={birthday} phone={this.state.phone} desc={this.state.desc} setEdittingMode={this.setEdittingMode} />
                }
                <div className="LeagueList">
                    <LeagueList/>    
                </div>
            </div>
        )
    }
}