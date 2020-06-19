import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
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
        this.dataSubmit(this.state.name, this.state.state, this.state.image);
    }
    dataSubmit(name, state, image){
        const formData = {name: name, state: state, image: image}

        axios.post('/api/teamadd', formData).then((response) => {
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
                                    <div className="col-md-6">
                                        <div className="form-group text-center">
                                            <img src="" className="images" width="150px" height ="150px"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Team Logo: </label>
                                            <input type="file" name="logo" onChange={(e) => this.handleImageChange(e)}/>
                                        </div>
                                        <div className="form-group">    
                                            <label>Team Name: </label>
                                            <input type="text" name="name" className="form-control" onChange={(e) => this.handleNameChange(e)} />
                                        </div>
                                        <div className="form-group">    
                                            <label>State Name: </label>
                                                <input type="text" name="state" className="form-control" onChange={(e) => this.handleStateChange(e)} />
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

 