import React, { useState } from 'react';

const Product = (props) => {
  let products = props.products;
  const [product, setProduct] = useState(0);

  const goLast = () => {
    if (products[product - 1]) {
      setProduct(product - 1);
    } else {
      setProduct(products.length - 1);
    }
  }

  const goNext = () => {
    if (products[product + 1]) {
      setProduct(product + 1);
    } else {
      setProduct(0);
    }
  }

  return (
    <div className="page-container">
      <img src={products[product].url}></img><br></br>
      <button onClick={goLast}>Last</button>
      <button className="products-btn" onClick={goNext}>Next</button>
    </div>
  );
};

export default Product;