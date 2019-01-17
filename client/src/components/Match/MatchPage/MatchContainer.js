import React from 'react';
import { TeamContainer } from './MatchComponents/Team/TeamContainer';
import { ModificationButton } from './MatchComponents/ModificationButton/ModificationButton';
import {StaffContainer} from './MatchComponents/Staff/StaffContainer';
import API from '../../../utils/API.js';

/**
 * @property {match Object} - json object representing the match
 */
export class MatchContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = { //TO DO : replace {} by null ??
            league1 : {},
            league2 : {},
            league1Members : [],
            league2Members : [],
            referee: null,
            mc: null,
            admin : false,
            //lists of id, can be changed by joiningButton, no call to backend
            league1MembersPropositions: [],
            league2MembersPropositions: [],
            refereePropositions:[],
            mcPropositions:[]
        }; 
        this.addToLeague = this.addToLeague.bind(this);
        this.removeFromLeague = this.removeFromLeague.bind(this);

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

    componentDidMount(){        
        //those const are promises
        const league1 = API.getLeagueById(this.props.match.league1Id);
        const league2 = API.getLeagueById(this.props.match.league2Id);
        const league1Members = this.findUsers(this.props.match.league1Members);
        const league2Members = this.findUsers(this.props.match.league2Members);
        const referee = this.props.match.referee ? API.getUserById(this.props.match.referee) : Promise.resolve({data:{user:null}}); //TO CHECK : to make it work even if no referee
        const mc = this.props.match.mc ? API.getUserById(this.props.match.mc) : Promise.resolve({data:{user:null}});
        const admin = this.isAdmin(localStorage.getItem('id'));
        const self = this;
        Promise.all([league1,league2,league1Members,league2Members,referee,mc, admin]).then(
            function(result){
                self.setState({
                    league1 : result[0].data.league,
                    league2 : result[1].data.league,
                    league1Members : result[2].map(userData => userData.data.user),
                    league2Members : result[3].map(userData => userData.data.user),
                    referee : result[4].data.user,
                    mc : result[5].data.user,
                    admin : result[6],
                    league1MembersPropositions: self.props.match.league1MembersPropositions,
                    league2MembersPropositions: self.props.match.league2MembersPropositions,
                    refereePropositions: self.props.match.refereePropositions,
                    mcPropositions: self.props.match.mcPropositions
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
        const userId = localStorage.getItem('id');
        
        //infos about the match that were fetched from DB
        const league1 = this.state.league1;
        const league2 = this.state.league2;
        const league1Members = this.state.league1Members;
        const league2Members = this.state.league2Members;
        const referee = this.state.referee;
        const mc = this.state.mc;

        //true if current user is waiting for the role
        const waitingLeague1 = this.state.league1MembersPropositions.includes(userId);
        const waitingLeague2 = this.state.league2MembersPropositions.includes(userId);
        const waitingReferee = this.state.refereePropositions.includes(userId);
        const waitingMc = this.state.mcPropositions.includes(userId);
        const admin = this.state.admin;

        return(
            <div className='matchContainer'>
                <TeamContainer className='league1' league={league1} participants={league1Members} waiting={waitingLeague1} addParticipant={(x,y)=> this.addToLeague(x,y,1)} removeParticipant={(x,y)=> this.removeFromLeague(x,y,1)} update={this.setState.bind(this)} />
                <span className='VS'>VS</span>
                <TeamContainer className='league2' league={league2} participants={league2Members} waiting={waitingLeague2} addParticipant={(x,y)=> this.addToLeague(x,y,2)} removeParticipant={(x,y)=> this.removeFromLeague(x,y,2)} update={this.setState.bind(this)} />
                <p className='description'>{this.props.match.description}</p>
                <StaffContainer matchId={this.props.match._id} referee={referee} mc={mc} waitingReferee={waitingReferee} waitingMc={waitingMc} update={this.setState.bind(this)} />
                {admin ? <ModificationButton matchId={this.props.match._id} /> : null /* modification button, displayed only if current user is admin of the page */}          
            </div>
        )
    }
}