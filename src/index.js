import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {AuthProvider} from './Application/Context/auth';


ReactDOM.render(
  
    <AuthProvider>
      <App />
    </AuthProvider>,

  document.getElementById('root')
);

