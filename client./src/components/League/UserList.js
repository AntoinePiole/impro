import React from 'react';
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

export class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [{user : {name : "Leshran", id:"1"}, isAdmin : true}, {user : {name : "", first_name:"Roméo", last_name:"Sandoz", id:"2"}, isAdmin : false}] // Later user will be given by its id, and should be retrieved
        }
        //isAdmin is true iff the corresponding user is an admin of list
        this.selectUser = this.selectUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.setRole = this.setRole.bind(this);
    }

    selectUser (user) {
        console.log("Going to" + user.user.id);
        window.location="/user/" + user.user.id
    }

    removeUser (user) {
        console.log("remove the user", user)
    }

    setRole (userId, leagueId, role) {
        console.log ("set the status of " + userId + " from league " + leagueId + " to " + role);
    }

    render() {
        return (
            <div>
                <h2>
                    Liste des joueurs
                </h2>
                <ListGroup>
                {this.state.users.map((user) => 
                    <ListGroupItem key={user.user.id} >
                        {user.isAdmin?<span className="glyphicon glyphicon-asterisk"></span> : <span className="glyphicon glyphicon-user"></span>} 
                        <a onClick={() => this.selectUser(user)}>
                            {user.user.name? user.user.name : user.user.first_name + ' ' + user.user.last_name}
                        </a>
                        {<Button className="glyphicon glyphicon-remove" onClick = {() => this.removeUser(user.user.id)}/>} 
                        {this.props.isAdmin?
                            user.isAdmin? //This is true if the user browsing this page is an admin of the page
                                <Button className="glyphicon glyphicon-user" onClick = {() => this.setRole(user.user.id, this.props.id, "user")}/>
                            :
                                <Button className="glyphicon glyphicon-asterisk" onClick = {() => this.setRole(user.user.id, this.props.id, "admin")}/>
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