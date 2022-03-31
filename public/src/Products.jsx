import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  let products = props.products;
  let mapped = products.map(item => {
    return (
      <div className="img-container">
        <img key={item.id} onClick={() => handleImageSelect(item.id)} src={item.url}></img>
      </div>
    );
  });
  let navigate = useNavigate();

  const handleImageSelect = (event) => {
    navigate(`./${event}`);
  }

  // return (
  //   <div className="page-container">
  //     <img className="products-img" onClick={() => handleImageSelect(products[product].id)} src={products[product].url}></img><br></br>
  //     <button onClick={goLast}>Last</button>
  //     <button className="products-btn" onClick={goNext}>Next</button>
  //   </div>
  // );
  return (
    <div className="page-container">
      <div className="row">
        {mapped}
      </div>
    </div>
  );
};

export default Product;