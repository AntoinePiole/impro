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
                {this.props.id === localStorage.getItem('id')?              //This is quite stupid here : we show the button to edit the league if the logged user's id and the league's id are the same, for easier testing. Replace this test later : should be shown iff the logged user is an admin of the league
                    <Button onClick={this.props.setEdittingMode} bsSize="large" type="submit">
                        Modifier ma ligue
                    </Button>
                : null}
            </div>
        )
    }
}