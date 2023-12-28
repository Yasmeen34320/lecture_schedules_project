import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EmployeeCrud from './EmployeeCrud';
import MyTable from './MyTble';
import Test from './Test';
import { render } from 'react-dom';

import AppRouter from './AppRouter.js';
import Login from './Login.js';
global.departement='computer';
// const root = ReactDOM.createRoot(document.getElementById('root'));
render(
  <React.StrictMode>
    {/* <EmployeeCrud /> */}
    {/* <MyTable/> */}
    <AppRouter />
    {/* <App/> */}
    {/* <Test/> */}
    {/* <App/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
