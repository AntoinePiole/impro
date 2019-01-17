import React from 'react';
import { TeamContainer } from './MatchComponents/TeamContainer/TeamContainer.js';
import {Description} from './MatchComponents/Description/Description';
import { ModificationButton } from './MatchComponents/ModificationButton/ModificationButton';
import {StaffContainer} from './MatchComponents/StaffContainer/StaffContainer';
import API from '../../utils/API.js';

import './MatchContainer.css';

/**
 * @property {match Object} - json object representing the match
 */
export class MatchContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = { //TO DO : replace {} by null ??
            isModifying: false, //true if page in modification (to display the 'admin page')
            descriptionText: this.props.match.description,
            league1 : {},
            league2 : {},
            league1Members : [],
            league2Members : [],
            league1MembersPropositions : [],
            league2MembersPropositions : [],
            referee: null,
            mc: null,
            refereePropositions : [],
            mcPropositions : [],
            admin : false
        }; 
        this.setDescriptionText = this.setDescriptionText.bind(this);
        this.addToLeague = this.addToLeague.bind(this);
        this.removeFromLeague = this.removeFromLeague.bind(this);
        this.handleModify = this.handleModify.bind(this);

    }
    /**
     * adds a participant to definitive or waiting list for this league/match
     * @param {String} userId 
     * @param {boolean} waiting - true if adding to the waiting list, false if to the definitive
     * @param {number} leagueNumber - 1 or 2, defines which team
     */
    addToLeague(userId,waiting,leagueNumber){
        const role = 'participant' + leagueNumber;
        return API.addToMatch(userId, this.props.match._id, {role: role, waiting: waiting});
    }
    
    /**
     * removes a participant from definitive or waiting list for this league/match
     * @param {String} userId 
     * @param {boolean} waiting - true if adding to the waiting list, false if to the definitive
     * @param {number} leagueNumber - 1 or 2, defines which team
     */
     removeFromLeague(userId,waiting,leagueNumber){
        const role = 'participant' + leagueNumber;
        return API.removeFromMatch(userId,this.props.match._id, {role: role, waiting: waiting});
    }

    /**
     * converts a list of members' ids in a list of members
     * @returns {Promise} a promise resolved iff we found all users, value is the array of users
     * @param {id array} userIdList 
     */
    async findUsers(userIdList){ //TO CHECK : this might be full of bugs because of async
        if(!userIdList){
            return Promise.resolve([]);
        }
        const promises = userIdList.map(
            function (userId) {
                return API.getUserById(userId);
            }
        );
        return Promise.all(promises); //TO DO : if one of users bug, everything crashes, other way to do it ?
    }
    
    /**
     * true if user is admin of the league
     * @param {*} leagueId 
     * @param {*} userId 
     */
    async adminLeague(leagueId,userId){ //TO PUT in API
        const leagueData = await API.getLeagueById(leagueId);
        const league = leagueData.data.league;
        if(!league.members){return false};
        const userLeague = league.members.find ( user => user._id === userId ); 
        if (userLeague) { //if the user is in the league
            return userLeague.isAdmin; // check if he's admin
        }
        return false; 
    }

    /**
     * returns true if user is admin of the match or of one of the leagues playing
     * @property {id} userId
     */
    async isAdmin(userId){
        const match = this.props.match;
        const adminLeague1 = await this.adminLeague(match.league1Id, userId); //true if user is admin of league1
        const adminLeague2 = await this.adminLeague(match.league2Id, userId); //true if user is admin of league2
        const adminMatch = (match.admins.indexOf(userId) != -1); //true if user is admin of the match
        return (adminMatch || adminLeague1 || adminLeague2);
    
    }

    setDescriptionText(text){
        this.setState({descriptionText: text});
    }

    handleModify(event){
        if(this.state.isModifying) {
            const text = this.state.descriptionText;
            const self = this;
            API.patchMatch(this.props.match._id,{description: text}).then(
                function (result,err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    self.setState({isModifying: false}); //TO CHECK : this is bind?
                }
            );
        } else {
            if (this.isAdmin(localStorage.getItem('id'))){ //if current user has right to modify match TO MODIFY : not very secure admin
                this.setState({isModifying: true});
            } 
            else {console.log("Vous n'avez pas les droits pour modifier ce match");}
        }   
    }

    componentDidMount(){        
        //those const are promises
        const league1 = API.getLeagueById(this.props.match.league1Id);
        const league2 = API.getLeagueById(this.props.match.league2Id);
        const league1Members = this.findUsers(this.props.match.league1Members);
        const league2Members = this.findUsers(this.props.match.league2Members);
        const league1MembersPropositions = this.findUsers(this.props.match.league1MembersPropositions);
        const league2MembersPropositions = this.findUsers(this.props.match.league2MembersPropositions);
        const referee = this.props.match.referee ? API.getUserById(this.props.match.referee) : Promise.resolve({data:{user:null}}); //TO CHECK : to make it work even if no referee
        const mc = this.props.mc ? API.getUserById(this.props.mc) : Promise.resolve({data:{user:null}});
        const refereePropositions = this.findUsers(this.props.match.refereePropositions);
        const mcPropositions = this.findUsers(this.props.match.mcPropositions);
        const admin = this.isAdmin(localStorage.getItem('id'));
        const self = this;
        Promise.all([league1,league2,league1Members,league2Members,league1MembersPropositions,league2MembersPropositions,referee,mc,refereePropositions,mcPropositions, admin]).then(
            function(result){
                self.setState({
                    league1 : result[0].data.league,
                    league2 : result[1].data.league,
                    league1Members : result[2].map(userData => userData.data.user),
                    league2Members : result[3].map(userData => userData.data.user),
                    league1MembersPropositions : result[4].map(userData => userData.data.user),
                    league2MembersPropositions : result[5].map(userData => userData.data.user),
                    referee : result[6].data.user,
                    mc : result[7].data.user,
                    refereePropositions : result[8].map(userData => userData.data.user),
                    mcPropositions : result[9].map(userData => userData.data.user),
                    admin : result[10]
            })
        }
        ).catch(
            function(err){
                console.log('MatchContainerError : '+err);
            }
        )
    }

    //componentDidUpdate : condition est ce que mon nouveau state est le même que l'ancien ? ==> boucle plus

    render(){
        const league1 = this.state.league1;
        const league2 = this.state.league2;
        const league1Members = this.state.league1Members;
        const league2Members = this.state.league2Members;
        const league1MembersPropositions = this.state.league1MembersPropositions;
        const league2MembersPropositions = this.state.league2MembersPropositions;
        const refereePropositions = this.state.refereePropositions;
        const referee = this.state.referee;
        const mc = this.state.mc;
        const mcPropositions = this.state.mcPropositions;
        const admin = this.state.admin;
        return(
            <div className='matchContainer'>
                <TeamContainer className='league1' league={league1} participants={league1Members} participantsPropositions={league1MembersPropositions} isModifying={this.state.isModifying} addParticipant={(x,y)=> this.addToLeague(x,y,1)} removeParticipant={(x,y)=> this.removeFromLeague(x,y,1)} />
                <span className='VS'>VS</span>
                <TeamContainer className='league2' league={league2} participants={league2Members} participantsPropositions={league2MembersPropositions} isModifying={this.state.isModifying} addParticipant={(x,y)=> this.addToLeague(x,y,2)} removeParticipant={(x,y)=> this.removeFromLeague(x,y,2)} />
                <Description descriptionText={this.state.descriptionText} isModifying={this.state.isModifying} setDescriptionText={this.setDescriptionText} />
                <StaffContainer matchId={this.props.match._id} referee={referee} mc={mc} refereePropositions={refereePropositions} mcPropositions={mcPropositions} isModifying={this.state.isModifying}/>
                {admin ? <ModificationButton onClick={this.handleModify} isModifying={this.state.isModifying}/> : null /* modification button, displayed only if current user is admin of the page */}
            
            </div>
        )
    }
}