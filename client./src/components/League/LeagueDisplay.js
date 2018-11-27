import React from 'react';
import { Button } from "react-bootstrap";
import './League.css';


export class LeagueDisplay extends React.Component {

    send = event => {
        this.props.send();
    }

    render() {
        return (
            <div className="LeagueDisplay">
                <h1>{this.props.nickname? this.props.nickname:this.props.name}</h1>
                {this.props.nickname !== "" ?
                    <span>
                        <p> Nom officiel : {this.props.name}</p>
                        <p> Nom usuel : {this.props.nickname}</p>
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
            </div>
        )
    }
}