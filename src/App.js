import logo from './logo.svg';
import './App.css';
import userData from './users.json';
import React, { useState } from 'react';
import Login from './Login';
import UserDashboard from './UserDashboard';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (userData) => {
    setLoggedInUser(userData);
  };

  return (
  
    <div>
      {loggedInUser ? (
        <UserDashboard user={loggedInUser} />
      ) : (
        <Login onLogin={handleLogin} users={userData} />
      )}
    </div>
   
  );
}

export default App;
