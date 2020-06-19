import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount(){
        axios.get('/api/list').then(response=> {
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
                                                <div className="col-md-3 card">
                                                    <div className="card-img-top text-center mb-5">
                                                        <img src={`/storage/logo/images/${data.logo}`} width="200" height="200"/>
                                                    </div>
                                                    <div className="card-body">
                                                        <center><h3 className="card-title mb-5">{data.name}</h3></center>
                                                        <div className="card-text text-center mb-5">{data.state}</div>
                                                            <div className="buttons">
                                                                <Link to={`/edit/${data.id}`} className ="btn btn-danger pull-left" type="button">Edit</Link> 
                                                                <Link to={`/teams/${data.id}`} className ="btn btn-primary pull-right" type="button">View</Link>
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
