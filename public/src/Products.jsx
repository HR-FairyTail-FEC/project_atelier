import React from 'react';
import { useNavigate } from 'react-router-dom';

function Product(props) {
  const navigate = useNavigate();
  const handleImageSelect = (event) => {
    navigate(`./${event}`);
  };
  const { products } = props;
  const mapped = products.map((item) => (
    <div key={item.id} className="img-container">
      <img onClick={() => handleImageSelect(item.id)} src={item.url} alt=""></img>
    </div>
  ));

  return (
    <div>
      <div className="row">
        {mapped}
      </div>
    </div>
  );
}

export default Product;
