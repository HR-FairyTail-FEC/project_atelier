import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './Home.jsx';
import Products from './Products.jsx';
import Cart from './Cart.jsx';
import ProductDetail from './ProductDetail.jsx';

const axios = require('axios');

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let elements = [];
    const fetch = async() => {
      let response = await axios.get('http://localhost:3000/api/products');
      let products = response.data;
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let id = product.id;
        let name = product.name;
        let price = product.default_price;
        let response = await axios.get(`http://localhost:3000/api/products/${id}/styles`);
        let styles = response.data;
        let url = styles.results[0].photos[0].thumbnail_url || 'https://cdn.shopify.com/s/files/1/0512/4741/5494/files/Clive_HPMobile_1400x.jpg?v=1647031597';
        elements.push({id, name, url, price});
        console.log(elements);
      }
      setProducts(elements);
    }
    fetch();
  }, []);

  return(
    <Router>
      <div className="padNavTop"></div>
      <nav className="topNav">
        <img className="logo" src="logo.png"></img>
        <ul>
          <li className="nav-list"><Link className="nav-links" to="/">Home</Link></li>
          <li className="nav-list"><Link className="nav-links" to="/products">Products</Link></li>
          <li className="nav-list"><Link className="nav-links" to="/cart">Cart</Link></li>
        </ul>
      </nav>
      <div className="padNavBottom"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products}/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />}></Route>
      </Routes>
      <div className="padBottom"></div>
    </Router>
  );
};

export default App;