import React, { useLayoutEffect, useState } from 'react';
import Overview from './Overview.jsx';
import QA from './Q&A.jsx';
import Related from './Related.jsx';
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
const axios = require('axios');

const ProductDetail = () => {

  const [productDetail, setDetail] = useState([]);

  let { id } = useParams();

  useLayoutEffect(() => {
    const fetch = async() => {
      try {
        let products = await axios.get(`http://localhost:3000/api/products`);
        let styles = await axios.get(`http://localhost:3000/api/products/${id}/styles`);
        let related = await axios.get(`http://localhost:3000/api/products/${id}/related`);
        let results = {
          products: products.data,
          styles: styles.data,
          related: related.data
        };
        setDetail(results);
      } catch(err) {
        console.error(err);
      }
    }
    fetch();
  }, []);

  return (
    <div className="page-container">
        <Overview details={productDetail}/>
        <Related />
        <QA />
        <Reviews />
    </div>
  );
}

export default ProductDetail;