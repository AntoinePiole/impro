import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}
const burl = "http://localhost:8000"

export default {
    login : function(email,password) {
        return axios.post(burl + '/users/login',{
            'email' : email,
            'password' : password
        },{
            headers: headers
        })
    },
    signup : function(send){
        return axios.post(burl + '/users/signup',send,{headers: headers})
    },
    
    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    logout : function() {
        localStorage.clear();
    },
    getUserById : function(id) {
        console.log(burl + '/users/'+id)
        return axios.get(burl + '/users/'+id)
    },
}
