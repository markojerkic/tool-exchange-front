import React from 'react';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Component } from 'react';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import Header from'../Statics/Header.js'; // import headera 
import Footer from'../Statics/Footer.js'; // import footera
import 'E:/Vulama/Education/projekti/Projekt/posudba-alata-frontend/src/Statics/Statics.css'

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
      <div id="content">
        <Header /> {/* Header pozivanje */}
        <div className="p-d-flex p-jc-center">
          <h2>Dobrodošli!</h2>
        </div>
        <div className="p-d-flex p-jc-center">
          <div>
            <span className="p-float-label">
              <InputText id="username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
              <label htmlFor="username">Username</label>
            </span>
          </div>
        </div>

        <br />

        <div className="p-d-flex p-jc-center">
            <span className="p-float-label">
              <Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} toggleMask />
              <label htmlFor="password">Password</label>
            </span>
        </div>

        <br />

        <div className="p-d-flex p-jc-center">
          <Button label="Login" className="p-button-raised p-button-rounded" />
        </div>

        <Footer /> {/* Footer pozivanje */}
        </div>
    )
  }
}



export default Login;