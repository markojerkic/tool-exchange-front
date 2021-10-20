import { Menubar } from 'primereact/menubar';
import React, { Component } from "react";
import { Button } from 'primereact/button';

class Home extends Component{

    constructor(props) {
        super(props);
        this.items = [
            {
                label: 'Oglasi',
                icon: 'pi pi-book',
                items: [
                    {
                        label: 'Dodaj novi oglas',
                        icon: 'pi pi-plus'
                    },
                    {
                        label: 'Pregledaj oglase',
                        icon: 'pi pi-list'
                    }
                ]
            }
        ];
    }

    render(){

        const start = <img alt="logo" src="../../favicon.ico" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;
        const end = <span><Button label="Signup" className="p-button-raised p-button-rounded p-button-danger" onClick={() => this.props.history.push('/register')} /> <Button label="Login" className="p-button-raised p-button-rounded" onClick={() => this.props.history.push('/login')} /></span>

        return (
            <div>
                <div className="card">
                    <Menubar model={this.items} start={start} end={end}/>
                </div>
                <h1>Home</h1>
            </div>
        )
    }
}


export default Home;