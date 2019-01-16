import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, DropdownButton, MenuItem } from "react-bootstrap";
import './League.css';
import API from '../../utils/API';


export class MatchSuggester extends React.Component {
    constructor(props) {
        super(props);
        _isMounted : false;
        this.state = {
            date: new Date().toISOString().slice(0, -1),
            name : "",
            location : "",
            sendingLeagueId : "",
            receivingLeague : "",
            leagues : [],
            title : "Avec laquelle de vos ligues ?",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleDropDownChange (event) {
        var leagues = this.state.leagues.filter(league =>
            league._id == event)
        var leagueName=(leagues[0]).nickname || (leagues[0]).name
        this.setState({
            sendingLeagueId : event,
            title : leagueName
        });
    }


    async sendRequest (event) {
        const match= {
            name : this.state.name,
            date : this.state.date,
            location : this.state.location,
            league1Id : this.state.sendingLeagueId,
            league2Id : this.props.receivingLeagueId,
            league1Members : [localStorage.getItem("id")],
            league2Members: [],
        }
        try {
            var res = await API.makeMatch({match:match});
            var id = res.data.id;
            //Adding the request to both league's sentMatchRequestsIds and receivedMatchRequestsIds
            var data = await API.getLeagueById(this.props.receivingLeagueId)  
            var receivingLeague = data.data.league        
            var receivedMatchRequestsIds = receivingLeague.receivedMatchRequestsIds.push(id)
            var sentMatchRequestsIds = this.props.sentMatchRequestsIds.push(id)
            API.patchLeague(this.props.receivingLeagueId,
                {receivedMatchRequestsIds : receivedMatchRequestsIds})
            API.patchLeague(this.state.sendingLeagueId,
                {sentMatchRequestsIds : sentMatchRequestsIds})
            }
        catch (err) {
            alert(err)
        }
    }

    async componentDidMount () {
        this._isMounted = true;
        API.getLeaguesOfUser(localStorage.getItem("id"))
            .then(res=>{
                if (this._isMounted) {
                    this.setState({
                    leagues : res.data.leagues
                    }) 
                }
        })  
        API.getLeagueById(this.props.receivingLeagueId)
            .then(res=>{
                if (this._isMounted) {
                    this.setState({
                    receivingLeague : res.data.league
                    }) 
                }
        })  
    }

    componentWillUnmount() {
        //this._isMounted = false;
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

                <DropdownButton id="SuggesterDropDown" onSelect={this.handleDropDownChange} title={this.state.title}>
                    {this.state.leagues.map((league) => 
                        <MenuItem eventKey={league._id} key={league._id}> {league.nickname} </MenuItem>
                    )}
                </DropdownButton>

                <div className="UserDisplay" >
                    <FormGroup controlId="name">
                    <ControlLabel>Nom du match</ControlLabel>
                    <FormControl type="text" value={this.state.name} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="date">
                    <ControlLabel>Date</ControlLabel>      
                    <FormControl type="date" value={this.state.date} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup controlId="location">
                    <ControlLabel>Endroit</ControlLabel>
                    <FormControl type="text" value={this.state.location} onChange={this.handleChange}/>
                    </FormGroup>

                    <Button className="ValidationButton" onClick={this.sendRequest} type="submit">
                        Proposer
                    </Button>
                </div>
            </div>
        )
    }
}