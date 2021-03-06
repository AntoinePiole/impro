import React from 'react';
import * as moment from 'moment';
import { LeagueList } from './LeagueList';
import { UserEdit } from './UserEdit';
import { UserDisplay } from './UserDisplay';
import { UserNotFound } from './UserNotFound';
import './User.css';
import API from '../../utils/API';


export class User extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            id : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1),
            editting : false,
            email : "",
            firstName : "",
            familyName : "",
            username : "",
            birthday : "",
            phone : "",
            desc : "", 
            photoId : "",
            userNotFound : null,
            _isMounted : false
        }
        this.updateUser = this.updateUser.bind(this);
    }

    async componentDidMount () { // This is not working. Should it be placed somewhere else ?
        this.id = window.location.toString().substr(window.location.toString().lastIndexOf("/")+1);
        API.getUserById(this.id)
        .then (data => {
            var user = data.data.user;
            if (!user) {
                this.setState ({
                    userNotFound : true
                })
                return;
            }
            this.setState ({
                id : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1),
                editting : false,
                email : user.email,
                firstName : user.firstName || "Non renseigné",
                familyName : user.familyName || "Non renseigné",
                birthday : user.birthday || "Non renseignée",
                username : user.username || "Non renseigné",
                phone : user.phone || "Non renseigné",
                desc : user.desc || "Non renseigné",
                photoId : user.photoId || "",
                userNotFound : false,
                _isMounted : true
            })
        })
        .catch (err => {
            this.setState ({
                userNotFound : true
            })
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

    async updateUser (data) {
        await API.patchUser(this.id, data);
        await this.setState({
            editting : false
        })
    }
    render() {
        if(this.state.userNotFound) {
            return <UserNotFound />
        }
        console.log(this.state)
        const birthday = this.state.birthday===""? 'Non renseignée': moment(this.state.birthday).format('DD/MM/YYYY');
        return (
            <div className="User">
                {this.state._isMounted ?
                    <div>
                        {this.state.editting ?
                            <UserEdit id={this.state.id} email={this.state.email} firstName={this.state.firstName} familyName={this.state.familyName} username={this.state.username} birthday={birthday} phone={this.state.phone} desc={this.state.desc} photoId={this.state.photoId} handleChange={this.handleChange} updateUser={this.updateUser} /> 
                        :
                            <UserDisplay id={this.state.id} email={this.state.email} firstName={this.state.firstName} familyName={this.state.familyName} username={this.state.username} birthday={birthday} phone={this.state.phone} desc={this.state.desc} photoId={this.state.photoId} setEdittingMode={this.setEdittingMode} />
                        }
                        <LeagueList id={this.state.id}/>  
                    </div>
                :null}
            </div>
        )
    }
}