import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Matchlist extends Component {
    constructor(){
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount(){
        axios.get('/api/matchlist').then(response=> {
            this.setState({list:response.data});
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
                                    this.state.list.map(function(data,index) {
                                        return <div className="card-box" key={index}>
                                                <div className="col-md-12 cardmade">
                                                    <div className="date text-center mb-5">
                                                         <span><h3>Match Date:-{moment(data.date).format('MMMM, DD YYYY')}</h3></span>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="card-img-top text-center mb-5">
                                                            <img src={`/storage/logo/images/${data.team1_logo}`} width="200" height="200"/>
                                                        </div>  
                                                        <div className="cardname text-center">
                                                            <span><h4>{data.team1_name}</h4></span>
                                                        </div>
                                                        <div className="cardstate text-center">
                                                            <span>{data.team1_state}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 randomclass">
                                                        <div className="card-img-top text-center mb-5">
                                                            <span className="vs-group"><b>VS</b></span>
                                                        </div>  
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="card-img-top text-center mb-5">
                                                            <img src={`/storage/logo/images/${data.team2_logo}`} width="200" height="200"/>
                                                        </div>  
                                                        <div className="cardname text-center">
                                                            <span><h4>{data.team1_name}</h4></span>
                                                        </div>
                                                        <div className="cardstate text-center">
                                                            <span>{data.team1_state}</span>
                                                        </div>
                                                    </div>
                                                    <div className="button text-center">
                                                         <Link to = {`/matchedit/${data.id}`} type="button" className="btn btn-danger">Edit</Link>
                                                         <Link to = {`/matchresult/${data.id}`} className="btn btn-primary ml-15" style={{ marginLeft: "15px" }}>Update</Link>
                                                         <Link to = {`/playerresult/${data.id}`} className="btn btn-success ml-15" style={{ marginLeft: "15px" }}>Player Update</Link>
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
