import React from 'react';

const RatingBreakdown = props => {
  let percentsForEachBar = props.ratingBreakdownPercent;
  return (
  <div className="row-rating">

    <div className="star-bar-container">
      <div className="star-bar-text">
        <a>5 stars</a>
      </div>
      <div className="bar-container">
        <div className="bar-5" style={{width: percentsForEachBar[4]}}></div>
      </div>
    </div>

    <div className="star-bar-container">
      <div className="star-bar-text">
        <a>4 stars</a>
      </div>
      <div className="bar-container">
        <div className="bar-4" style={{width: percentsForEachBar[3]}}></div>
      </div>
    </div>

    <div className="star-bar-container">
      <div className="star-bar-text">
        <a>3 stars</a>
      </div>
      <div className="bar-container">
        <div className="bar-3" style={{width: percentsForEachBar[2]}}></div>
      </div>
     </div>

    <div className="star-bar-container">
      <div className="star-bar-text">
        <a>2 stars</a>
      </div>
      <div className="bar-container">
        <div className="bar-2" style={{width: percentsForEachBar[1]}}></div>
      </div>
    </div>

    <div className="star-bar-container">
      <div className="star-bar-text">
        <a>1 star</a>
      </div>
      <div className="bar-container">
        <div className="bar-1" style={{width: percentsForEachBar[0]}}></div>
      </div>
    </div>

  </div>
  )
}

export default RatingBreakdown;