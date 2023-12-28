// AppRouter.js
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Employee2 from './EmployeeCrud';
import Table from './MyTble';
import Login from './Login';
import App from './App';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/"  exact element={<Table />} />
        <Route path="/table"  exact element={<Table />} />
        <Route path="/log"  exact element={<App />} />
        <Route path="/Data" exact  element={<Employee2 />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
