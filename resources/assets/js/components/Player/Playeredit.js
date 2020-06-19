import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
                id: 0,
                firstname: '',
                lastname: '',
                player_image: '',
                image:'',
                player_jersey_number: '',
                team_id: '',
                country: '',
                list: []
            }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleJerseyNumberChange = this.handleJerseyNumberChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
    }

    componentDidMount(){
        axios.get('/api/playerdetail/'+ `${this.props.match.params.id}`).then(response=> {
            this.setState({
                id: response.data.player_info.id,
                firstname:response.data.player_info.firstname,
                lastname:response.data.player_info.lastname,
                player_jersey_number:response.data.player_info.player_jersey_number,
                team_id: response.data.player_info.team_id,
                country:response.data.player_info.country,
                player_image:response.data.player_info.player_image,
                list:response.data.team_list
            });
        }). catch(err => {
            console.log(err);
        })
    }

    handleFirstNameChange(e) {
        e.preventDefault(e);
        this.setState({
            firstname: e.target.value
        });
    }
    handleLastNameChange(e) {
        e.preventDefault(e);
        this.setState({
            lastname: e.target.value
        });
    }
    handleJerseyNumberChange(e){
        e.preventDefault(e);
        this.setState({
            player_jersey_number: e.target.value
        });
    }
    handleCountryChange(e) {
        this.setState({
            country: e.target.value
        });
    }
    handleTeamChange(e) {
        e.preventDefault(e);
        this.setState({
            team_id: e.target.value
        });
    }
    handleImageChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
    }
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            image: e.target.result
          })
        };
        reader.readAsDataURL(file);
    }
    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.image){
            this.state.image = this.state.player_image;
        }
        this.dataSubmit(this.state.id, this.state.firstname, this.state.lastname, this.state.image, this.state.player_jersey_number, this.state.team_id, this.state.country);
    }
    dataSubmit(id,firstname, lastname, image, player_jersey_number, team_id, country){
        const formData = {firstname: firstname, lastname: lastname, player_image: image, player_jersey_number:player_jersey_number, team_id:team_id, country: country}
        axios.post('/api/playerupdate/'+`${id}`, formData).then((response) => {
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
                                <div className="col-md-12">
                                    <div className="form-group text-center">
                                        <img src={`/storage/logo/images/${this.state.player_image}`} className="images" width="150px" height ="150px"/>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>First Name: </label>
                                                <input type="text" name="firstname" className="form-control" onChange={(e) => this.handleFirstNameChange(e)} value={this.state.firstname} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">    
                                                <label>Last Name: </label>
                                                <input type="text" name="lastname" className="form-control" onChange={(e) => this.handleLastNameChange(e)}  value={this.state.lastname}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Player Jersey Number: </label>
                                                <input type="text" name="player_jersey_name" className="form-control" onChange={(e) => this.handleJerseyNumberChange(e)} value={this.state.player_jersey_number} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">    
                                                <label>Country: </label>
                                                <input type="text" name="country" className="form-control" onChange={(e) => this.handleCountryChange(e)}  value={this.state.country}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Player Image: </label>
                                                <input type="file" name="player_image" className="form-control" onChange={(e) => this.handleImageChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">    
                                             <label>Team: </label>
                                                <select name = "team" className="form-control" value={this.state.team_id} onChange={(e) => this.handleTeamChange(e) }>
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

 