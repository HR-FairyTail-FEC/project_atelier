import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './Home.jsx';
import Products from './Products.jsx';
import Cart from './Cart.jsx';
import ProductDetail from './ProductDetail.jsx';

const axios = require('axios');

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:3000/api/products');
      const results = response.data;
      const promises = [];
      let result = [];
      for (let i = 0; i < results.length; i += 1) {
        const { id } = results[i];
        promises.push(axios.get(`http://localhost:3000/api/products/${id}/styles`));
      }
      const data = await Promise.all(promises);
      data.forEach((item) => {
        result = [...result, item.data];
      });
      const final = [];
      for (let j = 0; j < results.length; j += 1) {
        final.push({
          id: results[j].id,
          name: results[j].name,
          price: results[j].default_price,
          url: result[j].results[0].photos[0].thumbnail_url || 'https://cdn.shopify.com/s/files/1/0512/4741/5494/files/Clive_HPMobile_1400x.jpg?v=1647031597',
        });
      }
      setProducts(final);
    };
    fetch();
  }, []);

  return (
    <Router>
      <div className="padNavTop"> </div>
      <nav className="topNav">
        <img className="logo" src="logo.png" alt=""></img>
        <ul>
          <li className="nav-list"><Link className="nav-links" to="/">Home</Link></li>
          <li className="nav-list"><Link className="nav-links" to="/products">Products</Link></li>
          <li className="nav-list"><Link className="nav-links" to="/cart">Cart</Link></li>
        </ul>
      </nav>
      <div className="padNavBottom"> </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />}> </Route>
      </Routes>
      <div className="padBottom"> </div>
    </Router>
  );
}

export default App;
