import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import Home from './Team/Home'; 
import Edit from './Team/Edit'; 
import Team from './Team/Team'; 
import Add from './Team/Add'; 
import Playerlist from './Player/Playerlist'; 
import Player from './Player/Player'; 
import Playeredit from './Player/Playeredit';
import Playeradd from './Player/Playeradd'; 
import Matchadd from './Match/Matchadd'; 
import Matchlist from './Match/Matchlist';
import Matchedit from './Match/Matchedit'; 
import Matchresult from './Match/Matchresult'; 
import MatchPlayer from './Match/MatchPlayer';
import Points from './Match/Points'; 



export default class Main extends Component {
    render() {
        return (
            <BrowserRouter>
            <div className="container">
                <h2 className="text-center name-cricket p-5">CRICKET</h2>
                <Header />
                    {/* <Router> */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/edit/:id" component={Edit} />
                            <Route exact path="/teams/:id" component={Team} />
                            <Route exact path="/add" component={Add} />
                            <Route exact path="/player-list" component={Playerlist} />
                            <Route exact path="/playerinfo/:id" component={Player} />
                            <Route exact path="/playeredit/:id" component={Playeredit} />
                            <Route exact path="/playeradd" component={Playeradd} />
                            <Route exact path="/matchadd" component={Matchadd} />
                            <Route exact path="/match-list" component={Matchlist} />
                            <Route exact path="/matchedit/:id" component={Matchedit} />
                            <Route exact path="/matchresult/:id" component={Matchresult} />
                            <Route exact path="/playerresult/:id" component={MatchPlayer} />
                            <Route exact path="/points" component={Points} />
                            
                        </Switch>
                    {/* </Router> */}
                <Footer />
            </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
