import React        from 'react';
import ReactDOM     from 'react-dom';
import './index.module.css';
import App          from './app';
import Auth_service from "./service/auth_service";

const authService = new Auth_service()
ReactDOM.render(
  <React.StrictMode>
    <App authService={authService}/>
  </React.StrictMode>,
  document.getElementById('root')
);
