import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, DropdownButton, MenuItem } from "react-bootstrap";
import './League.css';


export class MatchSuggester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toISOString().slice(0, -1),
            location : "",
            sendingLeagueName : "",
            leagueList : []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });//NOT WORKING WITH DATE ATM
    }

    handleDropDownChange (event) {
        this.setState({
            sendingLeagueName : event
        });
    }

    sendRequest = event => {
        const request= {
            date : this.state.date,
            location : this.state.location,
            receivingLeagueId : this.props.receivingLeagueId,
            sendingLeagueName : this.state.sendingLeagueName
        }
        console.log("Send the match request " + request)
    }

    componentDidMount () {
        this.setState({
            //leagueList : (API.getUserById(localStorage.getItem("id"))).user.leagueList //When we have a working back, change to this
            leagueList : [{id : "1", nickname : "LDC"}, {id : "2", nickname : "Les autres"}]
        })
    }

    render() {
        return (
            <div className="Suggester" id="MatchSuggester">
                <h2>
                    Proposer un match
                </h2>
                <p>
                    Envoyer une requête à : {this.props.receivingLeagueName}
                </p>

                <DropdownButton id="SuggesterDropDown" onSelect={this.handleDropDownChange} title="Avez laquelle de vos ligues ?">
                    {this.state.leagueList.map((league) => 
                        <MenuItem eventKey={league.id} key={league.id}>{league.nickname}</MenuItem>
                    )}
                </DropdownButton>

                <div className="UserDisplay" >
                    <FormGroup controlId="date">
                    <ControlLabel>Date</ControlLabel>      
                    <FormControl type="date" value={this.state.date} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="location">
                    <ControlLabel>Endroit</ControlLabel>
                    <FormControl type="text" value={this.state.location} onChange={this.handleChange}/>
                    </FormGroup>

                    <Button className="ValidationButton" onClick={this.sendRequest} type="submit">
                        Valider modifications
                    </Button>
                </div>
            </div>
        )
    }
}