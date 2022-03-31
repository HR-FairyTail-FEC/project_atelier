import React from 'react';
import { useParams } from 'react-router-dom';

function Product() {
  let { id } = useParams();
  return (
    <div>This is the Product Page</div>
  );
}

export default Product;