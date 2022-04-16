import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  let onButtonClick = () => navigate('./products');
  return (
    <div className="page-container">
      <span className="small-home-text">ENTER THE</span>
      <span className="large-home-text">ATELIER</span>
      <button onClick={onButtonClick} className="home-btn">Enter</button>

    </div>
  );
}



export default Home;