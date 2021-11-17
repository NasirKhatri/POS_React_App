import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";

/*let customers;
async function getCustomers() {
  const response = await fetch("Customers");
  const responseData = await response.json();
  customers = responseData;
  console.log(customers);
}

getCustomers();*/

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
