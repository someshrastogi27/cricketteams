import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Playerlist extends Component {
    constructor(){
        super();
        this.state = {
            Player: []
        }
    }
    componentDidMount(){
        axios.get('/api/playerlist').then(response=> {
            this.setState({Player:response.data});
        }). catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
                    <div className="row">
                        <div className="col-md-12">
                           
                            <div className="card card-default">
                                <div className="card-body"> 
                                {
                                    this.state.Player.map(function(data,index) {
                                        return <div className="card-box" key={index}>
                                                <div className="col-md-3 card">
                                                    <div className="card-img-top text-center mb-5">
                                                        <img src={`/storage/logo/images/${data.player_image}`} width="200" height="200"/>
                                                    </div>
                                                    <div className="card-body">
                                                        <center><h3 className="card-title mb-5">{data.player_name}</h3></center>
                                                        <div className="card-text text-center mb-5">{data.name}</div>
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
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
}
