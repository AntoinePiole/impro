import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard.js';
import { Login } from './components/Login/Login.js';
import { User } from './components/User/User.js';
import { Signup } from './components/Signup/Signup.js';
import { PrivateRoute } from './components/PrivateRoute.js';
import './App.css';

class App extends Component {
        render() {
        return (
        <div className="App">
        <Route component = {Dashboard}/>
            <div className="App-content">
                <Switch>  
                    <Route exact path="/login" component={Login}/>
                    <Route exact path ="/signup" component={Signup}/>
                    <Route path ="/user/:id" component={User}/>
                </Switch>
            </div>
        </div>
        );
    }
}
export default App;