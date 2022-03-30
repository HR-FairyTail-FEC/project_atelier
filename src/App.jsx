import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Options } from '../config.js';
import Home from './Pages/Home.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import 'regenerator-runtime/runtime';
const axios = require('axios');

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {headers: Options});
        setData(response);
      } catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return(
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Product</Link>
        <Link to="/cart">Cart</Link>
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