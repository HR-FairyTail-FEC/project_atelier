import React from 'react';
import Overview from './Overview.jsx';
import QA from './Q&A.jsx';
import Related from './Related.jsx';
import Reviews from './Reviews.jsx';

const ProductDetail = () => {
  return (
    <div className="page-container">
        <Overview />
        <Related />
        <QA />
        <Reviews />
    </div>
  );
}

export default ProductDetail;