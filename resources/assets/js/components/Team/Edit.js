import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
                id: 0,
                name: '',
                state: '',
                logo: '',
                image: ''
            }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount(){
        axios.get('/api/teamdetail/'+ `${this.props.match.params.id}`).then(response=> {
            this.setState({
                id: response.data.id,
                name:response.data.name,
                state:response.data.state,
                logo:response.data.logo
            });
        }). catch(err => {
            console.log(err);
        })
    }

    handleNameChange(e) {
        e.preventDefault(e);
        this.setState({
            name: e.target.value
        });
    }
    handleStateChange(e) {
        this.setState({
            state: e.target.value
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
            this.state.image = this.state.logo;
        }
        this.dataSubmit(this.state.id, this.state.name, this.state.state, this.state.image);
    }
    dataSubmit(id,name, state, image){
        const formData = {name: name, state: state, image: image}
        axios.post('/api/teamupdate/'+`${id}`, formData).then((response) => {
            this.props.history.push("/");
        }). catch(err => {
            console.log(err);
        });   
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
                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="form-group text-center">
                                            <img src={`/storage/logo/images/${this.state.logo}`} className="images" width="150px" height ="150px"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Team Logo: </label>
                                            <input type="file" name="logo" onChange={(e) => this.handleImageChange(e)}/>
                                        </div>
                                        <div className="form-group">    
                                            <label>Team Name: </label>
                                            <input type="text" name="name" className="form-control" onChange={(e) => this.handleNameChange(e)}  value={this.state.name}/>
                                        </div>
                                        <div className="form-group">    
                                            <label>State Name: </label>
                                                <input type="text" name="state" className="form-control" onChange={(e) => this.handleStateChange(e)}  value={this.state.state}/>
                                        </div>   
                                        <div className="form-group">    
                                            <center>
                                                <button className="btn btn-primary">Submit</button>   
                                            </center>
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

 