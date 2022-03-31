import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Options } from '../../config.js';
import Home from './Pages/Home.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import 'regenerator-runtime/runtime';

const axios = require('axios');

const App = () => {
  const [data, setData] = useState([]);

  return(
    <Router>
      <div className="padNav"></div>
      <nav className="topNav">
        <img className="logo" src="https://res.cloudinary.com/brandpad/raw/upload/v1503910880/2%20Atelier_Logo_Primary_Positive.png"></img>
        <ul>
          <li className="nav-list"><Link className="nav-links" to="/">Home</Link></li>
          <li className="nav-list"><Link className="nav-links" to="/products">Products</Link></li>
          <li className="nav-list"><Link className="nav-links" to="/cart">Cart</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;