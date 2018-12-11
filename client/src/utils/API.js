import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}
const burl = "http://localhost:8000"

export default {
     //########## Getters ##########
    
    getUserById : function(id) { //Works
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
    signup : function(send) {
        return axios.post(burl + '/users/',send, {headers: headers})
    },
    makeLeague : function(send) {
        return axios.post(burl + '/leagues/',send, {headers: headers})
    },
    makeMatch : function(send) {
        return axios.post(burl + '/matches/',send, {headers: headers})
    },

    // ########## Logging ########## 
    login : function(email,password) {
        return axios.post(burl + '/users/login', {
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
        return axios.post(burl + '/leagues/' + leagueId + '/users/' + userId, {headers: headers})
    },
    removeFromLeague : function(userId, leagueId) {
        return axios.delete(burl + '/leagues/' + leagueId + '/users/'+userId, {headers: headers})
    },
    setRoleInLeague : function(userId, leagueId, send) {// DOES NOT YET WORK IN BACK, AND CANNOT THUS BE TESTED YET
        return axios.patch(burl + '/leagues/' + leagueId + '/users/' + userId, send, {headers: headers})
    }
    //Others not implemented as I do not know exactly which parameters will be needed
}