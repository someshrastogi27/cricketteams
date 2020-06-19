import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Points extends Component {
    constructor(props){
        super(props);
        this.state = {
                points: []
            }
    }
    componentDidMount(){
        axios.get('/api/points').then(response=> {
            this.setState({points:response.data});
        }). catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card-header">
                        <h2 className="text-center">Points Table</h2>
                    </div>
                    <div className="card card-default">
                        <div className="card-body">
                            <div className="col-md-12">
                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Team Name</th>
                                            <th>Matches</th>
                                            <th>Winner</th>
                                            <th>Lost</th>
                                            <th>Tie</th>
                                            <th>Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.points.map(function(data,index) {
                                                return(
                                                    <tr key={index}>
                                                        <td>{data.name}</td>
                                                        <td>{data.matches}</td>
                                                        <td>{data.winner}</td>
                                                        <td>{data.Lost}</td>
                                                        <td>{data.Tie}</td>
                                                        <td>{data.points}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>                       
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


 