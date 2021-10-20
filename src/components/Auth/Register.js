import React from 'react';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Component } from 'react';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

class Register extends Component{


  constructor(props) {
    super(props);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            phonenumber: '',
            selectedCity: null,
            address: '',
            zip: '',
            password: ''
        };

        this.cities = [
            {name: 'Zagreb', code: 'Zagreb'},
            {name: 'Split', code: 'Split'},
            {name: 'Rijeka', code: 'Rijeka'},
            {name: 'Osijek', code: 'Osijek'},
            {name: 'Velika Gorica', code: 'Velika Gorica'},
            {name: 'Zadar', code: 'Zadar'},
            {name: 'Slavonski Brod', code: 'Slavonski Brod'},
            {name: 'Pula', code: 'Pula'},
            {name: 'Dubrovnik', code: 'Dubrovnik'},
        ];
        this.onStateChange = this.onStateChange.bind(this);

    }

    onStateChange(e) {
        this.setState({selectedCity: e.value});
    }

  render(){
    
    return(
        <div className="card">
            <div className="p-d-flex p-jc-center">
                <h2>Registracija novog korisnika:</h2>
            </div>
            <div className="p-grid p-fluid p-formgrid p-jc-center">
                <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                    <label htmlFor="name">Ime</label>
                    <InputText id="name" type="text" />
                </div>
                <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                    <label htmlFor="lastname">Prezime</label>
                    <InputText id="lastname" type="text" />
                </div>
            </div>
            <div className="p-grid p-fluid p-formgrid p-jc-center">
                <div className="p-field p-col-12 p-md-12 p-lg-6 p-sm-12">
                    <label htmlFor="address">Adresa</label>
                    <InputTextarea id="address" type="text" rows="4" />
                </div>
            </div>
            <div className="p-grid p-fluid p-formgrid p-jc-center">
                <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                    <label htmlFor="city">Grad</label>
                    <Dropdown inputId="city" value={this.state.selectedCity} options={this.cities} onChange={this.onStateChange} placeholder="Select" optionLabel="name"/>
                </div>
                <div className="p-field p-col-12 p-md-6 p-lg-3 p-sm-12">
                    <label htmlFor="zip">Poštanski broj</label>
                    <InputText id="zip" type="text" />
                </div>
            </div>
            <div className="p-grid p-fluid p-formgrid p-jc-center">
                <div className="p-field p-col-12 p-md-12 p-lg-6 p-sm-12">
                    <label htmlFor="email">E-mail</label>
                    <InputText id="email" type="email"/>
                </div>
            </div>
            <div className="p-grid p-fluid p-formgrid p-jc-center">
                <div className="p-field p-col-12 p-md-12 p-lg-6 p-sm-12">
                    <label htmlFor="password">Password</label>
                    <Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} toggleMask />
                </div>
            </div>
            <div className="p-grid p-fluid p-formgrid p-jc-center">
                <div className="p-field p-col-12 p-md-9 p-lg-6 p-sm-12">
                    <label htmlFor="phonenumber">Broj telefona</label>
                    <InputText id="phonenumber" type="number"/>
                </div>
                
            </div>

            <div className="p-d-flex p-jc-center">
                <Button label="Registriraj se" className="p-button-raised p-button-rounded" onClick={() => this.props.history.push('/')} />
            </div>
            
        </div>
      )
  }
}


export default Register;