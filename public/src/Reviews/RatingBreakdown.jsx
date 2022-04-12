import React from 'react';

const RatingBreakdown = props => {
  let percentsForEachBar = props.ratingBreakdownPercent;
  return (
  <div className="row-rating">
    <div className="column-rating side-rating">
      <a href="#">5 stars</a>
    </div>
    <div className="column-rating middle">
      <div className="bar-container">
        <div className="bar-5" style={{width: percentsForEachBar[4]}}></div>
      </div>
    </div>
    <div className="side-rating">
      <a href="#">4 stars</a>
    </div>
    <span className="middle">
      <div className="bar-container">
        <div className="bar-4" style={{width: percentsForEachBar[3]}}></div>
      </div>
    </span>
    <div className="side-rating">
      <a href="#">3 stars</a>
    </div>
    <div className="middle">
      <div className="bar-container">
        <div className="bar-3" style={{width: percentsForEachBar[2]}}></div>
      </div>
    </div>
    <div className="side-rating">
      <a href="#">2 stars</a>
    </div>
    <div className="middle">
      <div className="bar-container">
        <div className="bar-2" style={{width: percentsForEachBar[1]}}></div>
      </div>
    </div>
    <div className="side-rating">
      <a href="#">1 star</a>
    </div>
    <div className="middle">
      <div className="bar-container">
        <div className="bar-1" style={{width: percentsForEachBar[0]}}></div>
      </div>
    </div>
  </div>
  )
}

export default RatingBreakdown;