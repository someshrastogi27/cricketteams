import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default class Matchedit extends Component {
    constructor(props){
        super(props);
        this.state = {
                id: 0,
                team1: '',
                team2: '',
                date: '',
                list: []
            }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTeam1Change = this.handleTeam1Change.bind(this);
        this.handleTeam2Change = this.handleTeam2Change.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount(){
        axios.get('/api/matchedit/'+ `${this.props.match.params.id}`).then(response=> {
            this.setState({
                list:response.data.team,
                id: response.data.match.id,
                team1: response.data.match.team1_id,
                team2: response.data.match.team2_id,
                date: response.data.match.date
            });
        }). catch(err => {
            console.log(err);
        })
    }

    handleTeam1Change(e) {
        e.preventDefault(e);
        this.setState({
            team1: e.target.value
        });
    }
    handleTeam2Change(e) {
        e.preventDefault(e);
        this.setState({
            team2: e.target.value
        });
    }
    handleDateChange(e){
        e.preventDefault(e);
        this.setState({
            date: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.dataSubmit(this.state.id,this.state.team1, this.state.team2, this.state.date);
    }
    dataSubmit(id,team1, team2, date){
        const formData = {team1_id: team1, team2_id: team2, date: date} 
        axios.post('/api/matchupdate/'+`${id}`, formData).then((response) => {
            this.props.history.push("/match-list");
            // console.log(response);
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
                                <div className="col-md-12">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Team 1: </label>
                                            <select name = "team1" className="form-control" value={this.state.team1} onChange={(e) => this.handleTeam1Change(e) }>
                                                <option value="">--Please Select Team--</option>
                                                {
                                                    this.state.list.map(function(data,index) {
                                                        return(
                                                                <option value={data.id} key={data.id}>{data.name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="form-group">
                                            <label>Team 2: </label>
                                            <select name = "team2" className="form-control" value={this.state.team2} onChange={(e) => this.handleTeam2Change(e) }>
                                                <option value="">--Please Select Team--</option>
                                                {
                                                    this.state.list.map(function(data,index) {
                                                        return(
                                                                <option value={data.id} key={data.id}>{data.name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Date: </label>
                                            <input type="date" name="date" className="form-control" value={this.state.date} onChange={(e) => this.handleDateChange(e)} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button className="btn btn-primary">Submit</button>
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

 