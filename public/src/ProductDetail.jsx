import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './Overview.jsx';
import Reviews from './Reviews/Reviews.jsx';
import Related from './Related.jsx';
const axios = require('axios');


function ProductDetail() {
  // console.log('<ProductDetail>')
  const [productDetail, setDetail] = useState([]);
  const { id } = useParams();
  const [productID, setProductID] = useState(id); //used to refresh productID in useEffect
  useLayoutEffect(() => {
    const promises = [];
    let result = [];
    const endpoints = [`/api/products/${productID}`, `/api/products/${productID}/styles`, `/api/products/${productID}/related`, `/api/reviews?product_id=${productID}&sort=relevant`, `/api/reviews/meta?product_id=${productID}`, `/api/qa/questions?product_id=${productID}`];
    const fetch = async () => {
      for (let i = 0; i < endpoints.length; i += 1) {
        promises.push(axios.get(`http://localhost:3000${endpoints[i]}`));
      }
      const data = await Promise.all(promises);;
      data.forEach((item) => {
        result = [...result, item.data];
      });
      const final = {};
      const elements = ['product', 'styles', 'related', 'reviews', 'meta', 'questions'];
      result.forEach((item, index) => {
        final[elements[index]] = item;
      });
      setDetail(final);
    };
    fetch();
  }, [productID]);

  return (
    <div className="page-container">
      <Overview details={productDetail}/>
      <Related details={productDetail} setProductID={setProductID} />
      <QA details = {productDetail}/>
      <Reviews details={productDetail} />
    </div>
  );
}

export default ProductDetail;
