import React from 'react';
import { Button } from "react-bootstrap";
import './League.css';
import API from '../../utils/API';


export class LeagueJoinRequester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent : false
        }
        this.handleRequest = this.handleRequest.bind(this);
        this.handleRefuse = this.handleRefuse.bind(this);
    }
    handleRequest = event => { //TODO TEST THAT IT WORKS ! Then show the list of requests when displaying a league we are an admin of, then handle the fact we can accept them
        API.requestToJoinLeague(this.props.userId, this.props.leagueId).then(res=> {
            this.setState({
                sent : true
            });
            //console.log(res);
        }
    )
    }

    handleRefuse = event => {
        API.refuseMemberPropositionOfLeague(this.props.userId, this.props.leagueId).then(res=> {
                this.setState({
                    sent : false,
                });
                //console.log(res);
            }
        )
    }

    componentDidMount () {
        this.setState({
            sent : this.props.memberPropositions.some(e => (e === this.props.userId))
        })
    }

    render() {
        if (this.state.sent) {
            return (
                <div className="LeagueJoinRequester" >
                    <p>
                        Vous avez demandé à rejoindre cette ligue. Vous serez ajouté à la ligue quand un administrateur aura accepté votre demande.
                    </p>
                    <Button className="ValidationButton" onClick={this.handleRefuse}>
                        Annuler ma demande
                    </Button>
                </div>
            )

        }
        else {
            return (
                <div className="LeagueJoinRequester" >
                    <Button className="ValidationButton" onClick={this.handleRequest}>
                        Demander à rejoindre la ligue
                    </Button>
                </div>
            )
        }
    }
}