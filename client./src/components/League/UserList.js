import React from 'react';
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import API from '../../utils/API';

export class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [{user : {name : "Leshran", id:"1"}, isAdmin : true}, {user : {name : "", first_name:"Roméo", last_name:"Sandoz", id:"2"}, isAdmin : false}]
        }
        this.selectUser = this.selectUser.bind(this);
    }

    selectUser (user) {
        console.log("Going to" + user.user.id);
        window.location="/user/" + user.user.id
    }

    removeUser (user) {
        console.log("remove the user", user)
    }

    render() {
        return (
            <div>
                <h2>
                    Liste des joueurs
                </h2>
                <ListGroup>
                {this.state.users.map((user) => (
                    <ListGroupItem key={user.user.id} >
                        {user.isAdmin?<span className="glyphicon glyphicon-asterisk"></span> : <span className="glyphicon glyphicon-user"></span>} 
                        <a onClick={() => this.selectUser(user)}>
                            {user.user.name? user.user.name : user.user.first_name + ' ' + user.user.last_name}
                        </a>
                        {<Button className="glyphicon glyphicon-remove" onClick = {() => this.removeUser(user)}/>} 
                    </ListGroupItem>
                ))}
                </ListGroup>
            </div>
        )
    }
}