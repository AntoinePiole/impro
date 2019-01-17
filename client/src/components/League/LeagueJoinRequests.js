import React from 'react';
import { ListGroup, ListGroupItem, Button, Row } from "react-bootstrap";
import API from '../../utils/API';
import { UserPhoto } from '../User/UserPhoto';

export class LeagueJoinRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailedMemberPropositions : [], // Later member will be given by its id, and should be retrieved
            leagueId:""
        }
        //isAdmin is true iff the corresponding member is an admin of list. THIS MUST STILL BE DONE
        this.selectUser = this.selectUser.bind(this);
        this.acceptUser = this.acceptUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    } 
 /**
  * Called upon selecting an an user
  */
    selectUser (user) {
        window.location="/user/" + user._id
    }

    acceptUser (userId) {
        console.log(userId)
        API.acceptMemberPropositionOfLeague(userId, this.state.leagueId)
            .then(res => {
                this.render()
            })
            .catch(err =>{
                alert(err)
            })
        console.log("accepted the member", userId, this.state.leagueId)
    }

    removeUser (userId) {
        API.refuseMemberPropositionOfLeague(userId, this.state.leagueId)
            .then(res => {
                this.render()
            })
            .catch(err =>{
                alert(err)
            })
        console.log("refused the member", userId, this.state.leagueId)
    }


    async componentDidMount () {
        this.setState(
            {leagueId : window.location.toString().substr(window.location.toString().lastIndexOf("/")+1)}
        );
        this.id = window.location.toString().substr(window.location.toString().lastIndexOf("/")+1); //The memberPropositions of the legague, but with all their parameters
        var data = await API.getDetailedMemberPropositionsOfLeague(this.id);
        await this.setState({detailedMemberPropositions : data.data.users});
    }

    render() {
        return (
            <div>
                <h2>
                    Liste des utilisateurs ayant demandé à rejoindre votre ligue
                </h2>
                <ListGroup>
                {this.state.detailedMemberPropositions.map((user) => 
                    <ListGroupItem key={user._id} >
                        <Row>
                            <UserPhoto photoId={user.photoId} thumbnail={true} />
                        </Row>
                        <Row>
                            <a onClick={() => this.selectUser(user)}>
                                {user.username? user.username : user.firstName + ' ' + user.familyName}
                            </a>
                            <Button className="glyphicon glyphicon-ok" onClick = {() => this.acceptUser(user._id)}/>
                            <Button className="glyphicon glyphicon-remove" onClick = {() => this.removeUser(user._id)}/>
                        </Row>
                    </ListGroupItem>
                )}
                </ListGroup>
            </div>
        )
    }
}