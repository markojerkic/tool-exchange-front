import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React from 'react';
import './App.css';
import Main from './components/Main';

const App = () => {
  
  PrimeReact.ripple = true;
  return(
    <div className="p-p-2">
      <Main className="p-m-3"/>
    </div>
  );
}

export default App;
