import React, { useState } from 'react';

const ReviewsStars = (props) => {
  // console.log('<ReviewsStars> with props', props);
  let rating = props.rating;
  let ratingRounded = (Math.round(rating * 4) / 4).toFixed(2);
  console.log('rating was ', rating, 'got rounded to ', ratingRounded);
  let starValues = ratingToArray(ratingRounded);
  let entryIndex = props.entryIndex;
  console.log('the star value array is', starValues);
  return (
    <div className="rating-breakdown-stars">
      {
        starValues.map((percentage,starIndex)=>{
          return (
            <div className="star" key={starIndex}>
              <svg width="24px" height="24px" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient id={`${entryIndex}_grad${starIndex}`}>
                      <stop offset={`${percentage}`} stopColor="black"/>
                      <stop offset={`${percentage}`} stopColor="white"/>
                    </linearGradient>
                  </defs>
                  <path fill={`url(#${entryIndex}_grad${starIndex})`} stroke="#646464"  strokeWidth="0.3px"
                  d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
                  l11.547-1.2L16.026,0.6L20.388,10.918z"/>
              </svg>
            </div>
          )
        })
      }
    </div>
  )
  function ratingToArray(rating){
    // console.log('in rating to array with rating', rating);
    let array = ['0%','0%','0%','0%','0%'];
    let whole = Math.floor(rating);
    let decimal = rating - whole;
    // console.log('whole is', whole, 'dec is ', decimal);
    for (let i =0; i<whole; i++){
      array[i] = '100%';
    }
    let decimalToPercentage = {
      0.25: '25%',
      0.5: '50%',
      0.75: '75%'
    }
    if (decimal !== 0){
      let percentage = decimalToPercentage[decimal];
      array[whole] = percentage;
    }
    return array;
  }
}

export default ReviewsStars;