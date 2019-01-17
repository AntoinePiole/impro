import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}

export default {
    //########## Getters ##########
    getUserById : function(id) { 
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
        return axios.post('/users/', send, {headers: headers})
    },
    makeLeague : function(send) {
        return axios.post('/leagues/', send, {headers: headers})
    },
    makeMatch : function(send) {
        return axios.post('/matches/', send, {headers: headers})
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
        return (localStorage.getItem('cookie') !== null);
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
    setRoleInLeague : function(userId, leagueId, send) {
        return axios.patch('/leagues/' + leagueId + '/users/' + userId, send, {headers: headers})
    },
    requestToJoinLeague : function(userId, leagueId) {
        return axios.post('/leagues/join/' + leagueId + '/users/' + userId, {headers: headers})
    },
    acceptMemberPropositionOfLeague : function(userId, leagueId) {
        return axios.patch('/leagues/join/' + leagueId + '/users/' + userId, {headers: headers})
    },
    refuseMemberPropositionOfLeague : function(userId, leagueId) {
        return axios.delete('/leagues/join/' + leagueId + '/users/' + userId, {headers: headers})
    },
    getUsersOfLeague : function(leagueId) {
        return axios.get('/users/leagues/' + leagueId, {headers: headers})
    },
    getDetailedMemberPropositionsOfLeague : function(leagueId) {
        return axios.get('/users/leagues/join/' + leagueId, {headers: headers})
    },
    getLeaguesOfUser : function(userId) {
        return axios.get('/leagues/users/' + userId, {headers : headers})
    },
    isAdminOfLeague : function(userId, members) {
        return members.some(e => (e._id === userId) && e.isAdmin)
    },
    isMemberOfLeague : function(userId, members) {
        return members.some(e => e._id === userId)
    },

    // ########## Images ########## 
    /**
     * Takes as argument the value of event
     * Where event is the value sent by on onChange listener
     * In a "file" type input
     */
    submitImage : function(event) { 
        var selectedFile = event.target.files[0]
        const fd = new FormData();
        fd.append('profileImage', selectedFile);
        return axios.post('/images/', fd);
    },

    // ########## User in a match ##########
    
    addToMatch : function(userId, matchId, send){
        return axios.patch('/matches/' + matchId + '/user/' + userId + '/add=true', send, {headers: headers})
    },
    removeFromMatch: function(userId, matchId, send){
        return axios.patch('/matches/' + matchId + '/user/' + userId + '/add=false', send, {headers: headers})
    },

// ########## Search ##########
    search:function(queryText, type){
        switch(type){
            case 'user': return this.searchUser(queryText);
            case 'league': return this.searchLeague(queryText);
            case 'match': return this.searchMatch(queryText);
            default: return new Error ('You should search user, league or match')
        }
    },

    searchMatch: function(queryText){
        return axios.get('/matches/search/'+queryText)
    },
    searchLeague: function(queryText){
        return axios.get('/leagues/search/'+queryText)
    },
    searchUser: function(queryText){
        return axios.get('/users/search/'+queryText)
    },

    // ########## Delete ##########
    cancelMatch(matchId){
        return axios.delete('/matches/'+matchId)
    }
}