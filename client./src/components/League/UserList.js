import React from 'react';
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import API from '../../utils/API';

export class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members : [], 
            leagueId:""
        }
        this.selectUser = this.selectUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.setRole = this.setRole.bind(this);
        this.isAnAdmin = this.isAnAdmin.bind(this);
    }

 /**
  * Called upon selecting an an user
  */
    selectUser (member) {
        window.location="/user/" + member._id
    }

    removeUser (userId) {
        if (this.state.members.length == 1) {
            alert("Cette ligue n'a qu'un membre, on ne peut pas l'en retirer.");
            return;
        }

        var answer = window.confirm("Voulez-vous vraiment retirer cet utilisateur de la ligue ?");
        if (!answer)
            {
                return;
            }
        API.removeFromLeague(userId, this.state.leagueId)
            .then(
                this.setState({
                    members: this.state.members.filter(member => member._id !== userId)
                })
            )
            .catch( err => 
                alert(err)
            )
    }

    setRole (memberId, leagueId, role) {
        console.log ("set the status of " + memberId + " from league " + leagueId + " to " + role);
    }
    /**
     * Return true if the user is an admin for this league
     * @param {*} userId 
     */

    isAnAdmin(member) {
        return API.isAdminOfLeague(member._id, this.state.members)
    }

    async componentDidMount () {
        this.setState(
            {leagueId : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1)}
        );
        this.id = window.location.toString().substr(window.location.toString().lastIndexOf("/")+1); //The members of the list, bt with estra parameters
        var data = await API.getUsersOfLeague(this.id);
        await this.setState({members : data.data.users});
    }


    render() {
        return (
            <div>
                <h2>
                    Liste des joueurs
                </h2>
                <ListGroup>
                {this.state.members.map((member) => 
                    <ListGroupItem key={member._id} >
                        {this.isAnAdmin(member)?  //If the user is an admin for the league, their icon is different
                            <span className="glyphicon glyphicon-asterisk"></span> 
                        :
                            <span className="glyphicon glyphicon-member"></span>
                        } 
                        <a onClick={() => this.selectUser(member)}>
                            {member.username? member.username : member.firstName + ' ' + member.familyName}
                        </a>
                        {this.props.isAdmin ? // Can remove people from the league if we're an admin for it.
                            <Button className="glyphicon glyphicon-remove" onClick = {() => this.removeUser(member._id)}/>
                        :null} 
                        {this.props.isAdmin?
                            this.isAnAdmin(member)? //If we are an admin for the league, we can edit the role of the corresponding person.
                                <Button className="glyphicon glyphicon-member" onClick = {() => this.setRole(member._id, this.props.id, "member")}/>
                            :
                                <Button className="glyphicon glyphicon-asterisk" onClick = {() => this.setRole(member._id, this.props.id, "admin")}/>
                        :    
                                this.isAnAdmin(member)? //Else, we can't edit them
                                <Button disabled className="glyphicon glyphicon-member"/>
                            :
                                <Button disabled className="glyphicon glyphicon-asterisk"/>
                        }
                    </ListGroupItem>
                )}
                </ListGroup>
            </div>
        )
    }
}