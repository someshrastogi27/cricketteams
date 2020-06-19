import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
                playerlist:'',
                playerhistory: ''
            }
    }
    componentDidMount(){
        axios.get('/api/playerinfo/'+ `${this.props.match.params.id}`).then(response=> {
            this.setState({
                playerlist: response.data.info,
                playerhistory: response.data.history
            });
        }). catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <h2 className="text-center">Player Info</h2>
                    </div>
                    <div className="card card-default">
                        <div className="card-body">
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <div className="form-group text-center">
                                        <img src={`/storage/logo/images/${this.state.playerlist.player_image}`} className="images" width="150px" height ="150px"/>
                                        <h2 className="text-center mb-5">{this.state.playerlist.player_name}</h2>
                                        <center><span>{this.state.playerlist.country}</span></center>
                                    </div>
                                </div>
                                <div className="col-md-6 team-info mt-5 text-center">
                                    <img src={`/storage/logo/images/${this.state.playerlist.logo}`} className="images" width="150px" height ="150px"/>
                                    <center><span>{this.state.playerlist.name}</span></center>
                                    <center><span>{this.state.playerlist.state}</span></center>
                                </div>
                            </div>                       
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card-header">
                        <h2 className="text-center">Player History</h2>
                    </div>
                    <div className="card card-default">
                        <div className="card-body">
                            <table className="table-striped table table-bordered table-hover">
                                <tr>
                                    <td><strong>No.of Matches</strong></td>
                                    <td>{this.state.playerhistory.matches}</td>
                                </tr>
                                <tr>
                                    <td><strong>Runs</strong></td>
                                    <td>{this.state.playerhistory.total_runs}</td>
                                </tr>
                                <tr>
                                    <td><strong>Highest Score</strong></td>
                                    <td>{this.state.playerhistory.highest_score}</td>
                                </tr>
                                <tr>
                                    <td><strong>Fifty</strong></td>
                                    <td>{this.state.playerhistory.fifty}</td>
                                </tr>
                                <tr>
                                    <td><strong>Hundered</strong></td>
                                    <td>{this.state.playerhistory.hundered}</td>
                                </tr>
                                <tr>
                                    <td><strong>Sixes</strong></td>
                                    <td>{this.state.playerhistory.sixes}</td>
                                </tr>
                                <tr>
                                    <td><strong>Fours</strong></td>
                                    <td>{this.state.playerhistory.fours}</td>
                                </tr>

                            </table>                      
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


 