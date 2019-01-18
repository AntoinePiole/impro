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
import API from './utils/API';
import { MatchPageModifier } from './components/Match/MatchPageModifier/MatchPageModifier';
import { MatchPage } from './components/Match/MatchPage/MatchPage';



class App extends Component {

    componentDidMount(){
        var self = this;
        API.getMatchById('5c326661b6f4c91143a11d26').then(
            function(val){
                self.setState({
                    match: val
                })
            }
        ).catch(
            function(err){console.log('err '+err)}
        )
    }
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
                        <Route path ="/match/:id" component = { MatchPage } />
                        <Route path ="/matchmodify/:id" component = {MatchPageModifier} />
                        <Route component = { NotFound } />
                    </Switch>
                    {/*{this.state.match ? <MatchContainer match={this.state.match.data.match} /> : null}*/}
                </div>
            </div>
        );
    }
}
export default App;