import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}

export default {
    //########## Getters ##########
    getUserById : function(id) { //Works
        return axios.get('/users/'+id);
    },
    getLeagueById : function(id) {
        return axios.get('/leagues/'+id);
    },
    getMatchById : function(id) {
        return axios.get('/matches/'+id)
    },

    // ########## Setters ##########
    patchUser : function(id, send) {
        return axios.patch('/users/'+id, send, {headers: headers});
    },
    patchLeague : function(id, send) {
        return axios.patch('/leagues/'+id, send, {headers: headers});
    },
    patchMatch : function(id, send) {
        return axios.patch('/matches/'+id, send, {headers: headers});
    },

    // ########## Constructors ########## 
    signup : function(send) {
        return axios.post('/users/',send, {headers: headers})
    },
    makeLeague : function(send) {
        return axios.post('/leagues/',send, {headers: headers})
    },
    makeMatch : function(send) {
        return axios.post('/matches/',send, {headers: headers})
    },

    // ########## Logging ########## 
    login : function(email,password) {
        return axios.post('/users/login', {
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
        return axios.post('/leagues/' + leagueId + '/users/' + userId, {headers: headers})
    },
    removeFromLeague : function(userId, leagueId) {
        return axios.delete('/leagues/' + leagueId + '/users/'+userId, {headers: headers})
    },
    setRoleInLeague : function(userId, leagueId, send) {// DOES NOT YET WORK IN BACK, AND CANNOT THUS BE TESTED YET
        return axios.patch('/leagues/' + leagueId + '/users/' + userId, send, {headers: headers})
    },
    getUsersOfLeague : function(leagueId) {
        return axios.get('/users/leagues/' + leagueId, {headers: headers})
    },
    getLeaguesOfUser : function(userId) {
        return axios.get('/leagues/users/' + userId, {headers : headers})
    },

    // ########## Images ########## 
    submitImage : function(image, path) {
        return axios.post('/images/');
    }
}