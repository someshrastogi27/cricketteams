import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Team extends Component {
    constructor(props){
        super(props);
        this.state = {
                teamlist: '',
                playerlist:[]
            }
    }
    componentDidMount(){
        axios.get('/api/teamdeinfo/'+ `${this.props.match.params.id}`).then(response=> {
            this.setState({
                teamlist: response.data.team,
                playerlist: response.data.player
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
                        <h2 className="text-center">Team Info</h2>
                    </div>
                    <div className="card card-default">
                        <div className="card-body">
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <div className="form-group text-center">
                                        <img src={`/storage/logo/images/${this.state.teamlist.logo}`} className="images" width="150px" height ="150px"/>
                                    </div>
                                </div>
                                <div className="col-md-6 team-info mt-5">
                                    <h2 className="text-center mb-5">{this.state.teamlist.name}</h2>
                                    <center><span>{this.state.teamlist.state}</span></center>
                                </div>
                            </div>                       
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card-header">
                        <h2 className="text-center">Player List</h2>
                    </div>
                    <div className="card card-default">
                                <div className="card-body"> 
                                {
                                    this.state.playerlist.map(function(data,index) {
                                        return <div className="card-box" key={index}>
                                                <div className="col-md-3 card">
                                                    <div className="card-img-top text-center mb-5">
                                                        <img src={`/storage/logo/images/${data.player_image}`} width="200" height="200"/>
                                                    </div>
                                                    <div className="card-body">
                                                        <center><h3 className="card-title mb-5">{data.firstname} {data.lastname}</h3></center>
                                                        <div className="card-text text-center mb-5">{data.country}</div>
                                                            <div className="buttons">
                                                                    <Link to={`/playeredit/${data.id}`} className ="btn btn-danger pull-left" type="button">Edit</Link> 
                                                                    <Link to={`/playerinfo/${data.id}`} className ="btn btn-primary pull-right" type="button">Player Info</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>;
                                    })
                                }
                            </  div>
                    </div>
                </div>
            </div>
        );
    }
}


 