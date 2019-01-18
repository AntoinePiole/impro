import React from 'react';
import { TeamContainerModifier } from './MatchComponentsModifier/Team/TeamContainerModifier';
import { StaffContainerModifier } from './MatchComponentsModifier/Staff/StaffContainerModifier';
import { ModificationButtonModifier } from './MatchComponentsModifier/ModificationButton/ModificationButtonModifier';
import { DeleteButton } from './MatchComponentsModifier/DeleteButton/DeleteButton';
import { DescriptionModifier } from './MatchComponentsModifier/Description/DescriptionModifier.js';
import { NotFound } from '../../NotFound/NotFound';
import API from '../../../utils/API.js';
/**
 * @property {match Object} - json object representing the match
 */
export class MatchContainerModifier extends React.Component{
    constructor(props){
        super(props);
        this.state = { //TO DO : replace {} by null ??
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
            admin : false,
            descriptionText: ''
        }; 
        this.addToLeague = this.addToLeague.bind(this);
        this.removeFromLeague = this.removeFromLeague.bind(this);
        this.setDescriptionText = this.setDescriptionText.bind(this);

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
    async findUsers(userIdList){
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
        this.setState({descriptionText:text})
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
                    admin : result[10],
                    descriptionText: self.props.match.description
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
        //local info
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
        const admin = this.state.isAdmin;

        if(admin){ //to prevent typing directly in url by a non-admin user
            return(
                <div className='matchContainer'>
                    <TeamContainerModifier className='league1' league={league1} participants={league1Members} participantsPropositions={league1MembersPropositions} addParticipant={(x,y)=> this.addToLeague(x,y,1)} removeParticipant={(x,y)=> this.removeFromLeague(x,y,1)} />
                    <span className='VS'>VS</span>
                    <TeamContainerModifier className='league2' league={league2} participants={league2Members} participantsPropositions={league2MembersPropositions} addParticipant={(x,y)=> this.addToLeague(x,y,2)} removeParticipant={(x,y)=> this.removeFromLeague(x,y,2)} />
                    <DescriptionModifier descriptionText={this.state.descriptionText} setDescriptionText={this.setDescriptionText} />
                    <StaffContainerModifier matchId={this.props.match._id} referee={referee} mc={mc} waitingReferee={refereePropositions} waitingMc={mcPropositions} matchId={this.props.match._id}/>
                    <ModificationButtonModifier matchId = {this.props.match._id} descriptionText={this.state.descriptionText} />
                    <DeleteButton matchId={this.props.match._id} />   
                </div>
            )
        }
        else {
            return(<NotFound />)
        }
    }
}