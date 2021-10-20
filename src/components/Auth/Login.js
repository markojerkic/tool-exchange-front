import React from 'react';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Component } from 'react';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';

class Login extends Component{


  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    };
}

  render(){
    
    return(
      <div className="card">
        <div className="p-d-flex p-jc-center">
          <h2>Dobrodošli!</h2>
        </div>
        <div className="p-grid p-fluid">
          <div className="p-col-12 p-d-flex p-jc-center">
            <div className="p-field">
              <span className="p-float-label">
                <InputText id="username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                <label htmlFor="username">Username</label>
              </span>
            </div>
          </div>

          <div className="p-col-12 p-d-flex p-jc-center">
            <div className="p-field">
              <span className="p-float-label">
                <Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} toggleMask />
                <label htmlFor="password">Password</label>
              </span>
            </div>
          </div>
        </div>

        <div className="p-d-flex p-jc-center">
          <Button label="Prijavi se" className="p-button-raised p-button-rounded" onClick={() => this.props.history.push('/')} />
        </div>

        </div>
    )
  }
}


export default Login;