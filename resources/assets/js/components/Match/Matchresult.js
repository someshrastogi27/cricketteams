import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default class Matchresult extends Component {
    constructor(props){
        super(props);
        this.state = {
                match_id: 0,
                team_id: 0,
                status: 0,
                teams: []
            }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount(){
        axios.get('/api/matchresult/'+ `${this.props.match.params.id}`).then(response=> {
            this.setState({
                teams: response.data.teams,
                match_id: response.data.match_detail.id,
                t1_logo: response.data.match_detail.team1_logo,
                t1_name: response.data.match_detail.team1_name,
                t1_state: response.data.match_detail.team1_state,
                t2_logo: response.data.match_detail.team2_logo,
                t2_name: response.data.match_detail.team2_name,
                t2_state: response.data.match_detail.team2_state,
                date: response.data.match_detail.date
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
    }
    handleStatusChange(e) {
        e.preventDefault(e);
        this.setState({
            status: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.dataSubmit(this.state.match_id, this.state.team_id, this.state.status);
    }
    dataSubmit(match_id,team_id, status){
        const formData = {match_id: match_id, team_id: team_id, status: status}
        axios.post('/api/match_result', formData).then((response) => {
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
                                        <div className="date text-center mb-5">
                                                <span><h3>Match Date:-{moment(this.state.date).format('MMMM, DD YYYY')}</h3></span>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card-img-top text-center mb-5">
                                                <img src={`/storage/logo/images/${this.state.t1_logo}`} width="200" height="200"/>
                                            </div>  
                                            <div className="cardname text-center">
                                                <span><h4>{this.state.t1_name}</h4></span>
                                            </div>
                                            <div className="cardstate text-center">
                                                <span>{this.state.t1_state}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4 randomclass">
                                            <div className="card-img-top text-center mb-5">
                                                <span className="vs-group"><b>VS</b></span>
                                            </div>  
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card-img-top text-center mb-5">
                                                <img src={`/storage/logo/images/${this.state.t2_logo}`} width="200" height="200"/>
                                            </div>  
                                            <div className="cardname text-center">
                                                <span><h4>{this.state.t2_name}</h4></span>
                                            </div>
                                            <div className="cardstate text-center">
                                                <span>{this.state.t2_state}</span>
                                            </div>
                                        </div>
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
                                            <label>Select Team Status</label>
                                            <select name="status" className="form-control" onChange={(e) => this.handleStatusChange(e) }>
                                                <option value="">--Please Select Team--</option>
                                                <option value="1">Winner</option>
                                                <option value="2">Lost</option>
                                                <option value="3">Tie</option>
                                            </select>
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

 