import React from 'react';
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import API from '../../utils/API';

export class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members : [], // Later member will be given by its id, and should be retrieved
            leagueId:"",
            users : [], // List of the members, with additionnal parameters.
        }
        //isAdmin is true iff the corresponding member is an admin of list. THIS MUST STILL BE DONE
        this.selectUser = this.selectUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.setRole = this.setRole.bind(this);
        this.isAnAdmin = this.isAnAdmin.bind(this);
    }
 /**
  * Called upon selecting an an user
  */
    selectUser (member) {
        window.location="/member/" + member.id
    }

    removeUser (member) {
        console.log("remove the member", member)
    }

    setRole (memberId, leagueId, role) {
        console.log ("set the status of " + memberId + " from league " + leagueId + " to " + role);
    }
    /**
     * Return true if the user is an admin for this league
     * @param {*} userId 
     */

    isAnAdmin(userId) {
        return this.state.members.find(obj => obj.id==userId).isAdmin
    }

    async componentDidMount () {
        this.setState(
            {leagueId : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1)}
        );
        this.id = window.location.toString().substr(window.location.toString().lastIndexOf("/")+1); //The members of the liste, bt with estra parameters
        var data = await API.getUsersOfLeague(this.id);
        this.setState({members : data.data.users});
    }


    render() {
        return (
            <div>
                <h2>
                    Liste des joueurs
                </h2>
                <ListGroup>
                {this.state.members.map((member) => 
                    <ListGroupItem key={member.id} >
                        {this.isAnAdmin(member.id)?  //If the user is an admin for the league, their icon is different
                            <span className="glyphicon glyphicon-asterisk"></span> 
                        :
                            <span className="glyphicon glyphicon-member"></span>
                        } 
                        <a onClick={() => this.selectUser(member)}>
                            {member.name? member.name : member.first_name + ' ' + member.last_name}
                        </a>
                        {this.props.idAdmin ? // Can remove people from the league if we're an admin for it.
                            <Button className="glyphicon glyphicon-remove" onClick = {() => this.removeUser(member.id)}/>
                        :null} 
                        {this.props.isAdmin?
                            this.isAnAdmin(member.id)? //If we are an admin for the league, we can edit the role of the corresponding person.
                                <Button className="glyphicon glyphicon-member" onClick = {() => this.setRole(member.id, this.props.id, "member")}/>
                            :
                                <Button className="glyphicon glyphicon-asterisk" onClick = {() => this.setRole(member.id, this.props.id, "admin")}/>
                        :
                            null    
                        }
                    </ListGroupItem>
                )}
                </ListGroup>
            </div>
        )
    }
}