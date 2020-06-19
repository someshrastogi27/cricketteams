import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class MatchPlayer extends Component {
    constructor(){
        super();
        this.state = {
            teams: [],
            players: [],
            match_id: 0,
            team_id: 0,
            runs: 0,
            hundered: 0,
            fifty: 0,
            sixes: 0,
            fours: 0
        }
    }
    componentDidMount(){
        axios.get('/api/matchresult/'+ `${this.props.match.params.id}`).then(response=> {
            this.setState({
                teams: response.data.teams,
                match_id: response.data.match_detail.id,
            });
        }). catch(err => {
            console.log(err);
        })
    }
    handleTeamChange(e) {
        e.preventDefault(e);
        this.setState({
            team_id: e.target.value
        });
        this.dataplayersList(e.target.value);
    }
    handlePlayerChange(e){
        e.preventDefault(e);
        this.setState({
            player_id: e.target.value
        });
    }
    handleRunsChange(e){
        e.preventDefault(e);
        this.setState({
            runs: e.target.value
        });
    }
    handleHunderedChange(e){
        e.preventDefault(e);
        this.setState({
            hundered: e.target.value
        });
    }
    handleFiftyChange(e){
        e.preventDefault(e);
        this.setState({
            fifty: e.target.value
        });
    }
    handleSixesChange(e){
        e.preventDefault(e);
        this.setState({
            sixes: e.target.value
        });
    }
    handleFoursChange(e){
        e.preventDefault(e);
        this.setState({
            fours: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.dataSubmit(this.state.match_id, this.state.player_id, this.state.team_id, this.state.runs, this.state.hundered, this.state.fifty, this.state.sixes, this.state.fours);
    }

    dataplayersList(team_id){
        const formData = {team_id: team_id}
        axios.post('/api/player_listing', formData).then((response) => {
            this.setState({
                players: response.data,
            });
        }). catch(err => {
            console.log(err);
        });   
      }

      dataSubmit(match_id, team_id, player_id, runs, hundered, fifty, sixes, fours){
        const formData = {match_id: match_id, team_id: team_id, player_id: player_id, hundered: hundered, runs: runs, fifty: fifty, sixes: sixes, fours: fours}
        axios.post('/api/player_history_save', formData).then((response) => {
            this.props.history.push("/");
        }). catch(err => {
            console.log(err);
        }); 
      }
    render() {
        return (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-default">
                                <div className="card-body"> 
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <div className="card-box">
                                            <div className="col-md-12 cardmade">
                                                <div className="col-md-12 mb-5">
                                                    <label>Select Team</label>
                                                        <select name="team_id" className="form-control" onChange={(e) => this.handleTeamChange(e) }>
                                                            <option value="">--Please Select Team--</option>
                                                                {
                                                                    this.state.teams.map(function(data,index) {
                                                                        return(
                                                                                <option value={data.team_id} key={data.team_id}>{data.team_name}</option>
                                                                        );
                                                                    })
                                                                }
                                                        </select>
                                                </div>
                                                <div className="col-md-12 mb-5">
                                                    <label>Select Player</label>
                                                        <select name="player_id" className="form-control" onChange={(e) => this.handlePlayerChange(e) }>
                                                            <option value="">--Please Select Player--</option>
                                                                {
                                                                    this.state.players.map(function(data,index) {
                                                                        return(
                                                                                <option value={data.player_id} key={data.player_id}>{data.player_name}</option>
                                                                        );
                                                                    })
                                                                }
                                                        </select>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Runs: </label>
                                                        <input type="number" name="runs" className="form-control" onChange={(e) => this.handleRunsChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Hundered: </label>
                                                        <input type="number" name="hundered" className="form-control" onChange={(e) => this.handleHunderedChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Fifty: </label>
                                                        <input type="number" name="fifty" className="form-control" onChange={(e) => this.handleFiftyChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Sixes: </label>
                                                        <input type="number" name="sixes" className="form-control" onChange={(e) => this.handleSixesChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Fours: </label>
                                                        <input type="number" name="fours" className="form-control" onChange={(e) => this.handleFoursChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 text-center">
                                                    <button className="btn btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
}
