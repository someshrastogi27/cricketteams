import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Team
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/">Team List</Link>
                                <Link className="dropdown-item" to="/add">Add Team</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/player-list" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Player
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/player-list">Player List</Link>
                                <Link className="dropdown-item" to="/playeradd">Add Player</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/match-list" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Matches
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/match-list">Match List</Link>
                                <Link className="dropdown-item" to="/matchadd">Add Match</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/points">Points <span className="sr-only"></span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

