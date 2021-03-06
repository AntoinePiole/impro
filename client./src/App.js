import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard.js';
import { Login } from './components/Login/Login.js';
import { User } from './components/User/User.js';
import { League } from './components/League/League.js';
import { LeagueMaker } from './components/League/LeagueMaker.js';
import { MyLeagues } from './components/MyLeagues/MyLeagues.js';
import { Signup } from './components/Signup/Signup.js';
import { SearchResultContainer } from './components/SearchResult/SearchResultContainer.js';
import { NotFound } from './components/NotFound/NotFound.js';
import './App.css';

class App extends Component {
        render() {
            return (
            <div className="App">
            <Route component = {Dashboard}/>
                <div className="App-content">
                    <Switch>  
                        <Route exact path="/login" component = { Login } />
                        <Route exact path ="/signup" component = { Signup } />
                        <Route path ="/user/:id" component = { User } />
                        <Route path ="/league/:id" component = { League }/>
                        <Route path ="/myleagues" component = { MyLeagues }/>
                        <Route path ="/newleague" component = { LeagueMaker }/>
                        <Route path ="/search" component = { SearchResultContainer } />
                        <Route component = { NotFound } />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default App;