// Login.js
import React, { useState } from 'react';
import './login.css'; 
import {useNavigate} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router} from 'react-router-dom';
const Login = ({ onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();

  // const handleLogin = () => {
  //   const userFound = users.find(user => user.username === username && user.password === password);

  //   if (userFound) {
  //    // navigate('/table');
  //      onLogin(userFound);
  //   } else {
  //     alert('  username or password is incorrect   ');
  //   }
  // };

  return (
<div class="conttt">
<Helmet> 
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"/>
          </Helmet>
    <div className="login-container">
      <h2>Log In</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username" class="lbl"> username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" class="lbl">password  </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button class ="lbl1"type="button" onClick={()=>{
           const userFound = users.find(user => user.username === username && user.password === password);

           if (userFound) {
            navigate('/Data');
              // onLogin(userFound);
           } else {
             alert('  username or password is incorrect   ');
           }
        }}>Log In </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
