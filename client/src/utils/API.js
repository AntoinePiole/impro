import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}
const burl = "http://localhost:8000"

export default {
     //########## Getters ##########
    
    getUserById : function(id) {
        return axios.get(burl + '/users/'+id);
    },
    getLeagueById : function(id) {
        return axios.get(burl + '/leagues/'+id);
    },
    getMatchById : function(id) {
        return axios.get(burl + '/matches/'+id);
    },

    // ########## Setters ##########

    patchUser : function(id, send) {
        return axios.patch(burl + '/users/'+id, send, {headers: headers});
    },
    patchLeague : function(id, send) {
        return axios.patch(burl + '/leagues/'+id, send, {headers: headers});
    },
    patchMatch : function(id, send) {
        return axios.patch(burl + '/matches/'+id, send, {headers: headers});
    },

    // ########## Constructors ########## 
    signup : function(send){
        return axios.post(burl + '/users/signup',send, {headers: headers})
    },
    makeLeague : function(send){
        return axios.post(burl + '/leagues/',send, {headers: headers})
    },
    makeMatch : function(send){
        return axios.post(burl + '/matches/signup',send, {headers: headers})
    },

    // ########## Logging ########## 
    login : function(email,password) {
        return axios.post(burl + '/users/login',{
            'email' : email,
            'password' : password
        },{
            headers: headers
        })
    },    
    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    logout : function() {
        localStorage.clear();
    },
    // ########## User in a league ########## 
    addToLeague : function(userId, leagueId) {
        return axios.get(burl + '/leagues/add/'+leagueId+'/users/'+userId, {headers: headers})
    },
    removeFromLeague : function(userId, leagueId) {
        return axios.get(burl + '/leagues/remove/'+leagueId+'/users/'+userId, {headers: headers})
    },
    setRoleInLeague : function(userId, leagueId, send) {// DOES NOT YET WORK IN BACK, AND CANNOT THUS BE TESTED YET
        return axios.post(burl + '/leagues/add/'+leagueId+'/users/'+userId, send, {headers: headers})
    }
}
