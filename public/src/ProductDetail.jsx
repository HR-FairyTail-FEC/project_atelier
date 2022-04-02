import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './Overview.jsx';
import Related from './Related.jsx';

const axios = require('axios');


function ProductDetail() {
  const [productDetail, setDetail] = useState([]);

  const { id } = useParams();
  // console.log('id clicked', id);

  useLayoutEffect(() => {
    const promises = [];
    let result = [];
    const endpoints = [`/api/products/${id}`, `/api/products/${id}/styles`, `/api/products/${id}/related`, `/api/reviews?product_id=${id}&sort=relevant`, `/api/reviews/meta?product_id=${id}`, `/api/qa/questions?product_id=${id}`, '/api/cart'];
    const fetch = async () => {
      for (let i = 0; i < endpoints.length; i += 1) {
        promises.push(axios.get(`http://localhost:3000${endpoints[i]}`));
      }
      // console.log(promises);
      const data = await Promise.all(promises);
      data.forEach((item) => {
        result = [...result, item.data];
      });
      const final = {};
      const elements = ['product', 'styles', 'related', 'reviews', 'meta', 'questions', 'cart'];
      result.forEach((item, index) => {
        final[elements[index]] = item;
      });
      // console.log('final item is' ,final);
      setDetail(final);
    };
    fetch();
  }, []);

  return (
    <div className="page-container">
      <Related details={productDetail} />
    </div>
  );
}

export default ProductDetail;
