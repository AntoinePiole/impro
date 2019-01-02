import React from 'react';
import { Button } from "react-bootstrap";
import './League.css';
import { LeaguePhoto } from './LeaguePhoto';
import { LeagueJoinRequester } from './LeagueJoinRequester';
import { LeagueNotFound } from './LeagueNotFound'


export class LeagueDisplay extends React.Component {
    send = event => {
        this.props.send();
    }
    render() {
        return (
            <div className="LeagueDisplay">
                <h1>{this.props.nickname? this.props.nickname:this.props.name}</h1>
                <LeaguePhoto photoId={this.props.photoId} />
                {this.props.nickname !== "" ?
                    <span>
                        <p> Nom officiel : {this.props.name}</p>
                        <p> Nom usuel : {this.props.nickname}</p>
                        <p> Adresse mail de contact : {this.props.email}</p>
                    </span>
                :
                    <p> Nom  : {this.props.name}</p>
                }
                <p className = 'leagueDescription'> Description : {this.props.desc}</p>
                {this.props.isAdmin? // Can modify league if we are an admin of the league
                    <Button onClick={this.props.setEdittingMode} bsSize="large" type="submit">
                        Modifier ma ligue
                    </Button>
                : null}

                {!this.props.isMember && !this.props.isLoading?
                    <LeagueJoinRequester leagueId={this.props.id} userId={localStorage.getItem("id")} memberPropositions={this.props.memberPropositions}/>
                :   
                    null 
                }
            </div>
        )
    }
}