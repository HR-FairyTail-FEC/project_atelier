import React, { useState } from 'react';
import moment from 'moment';
import ReviewsStars from './ReviewsStars.jsx';
import { AiOutlineCheck } from 'react-icons/ai';


const ReviewsEntry = (props) => {
  let result = props.result;
  let entryIndex = props.index;
  const [numOfHelpfulness, setNumOfHelpfulness] = useState(result.helpfulness);

  const incremented = () => {
    setNumOfHelpfulness(numOfHelpfulness + 1);
  }

  return (
    <div className="review-entry">
      <div className="entry-top">
        <div className="entry-stars">
          <EntryReviewsStars  rating={result.rating} entryIndex={entryIndex}/>
        </div>
        <div className="entry-user-date">
          {result.reviewer_name}, {moment(result.date).format('LL')}
        </div>
      </div>
      <div className="entry-bottom">
        <h3 className="entry-summary">{result.summary}</h3>
        <div className="entry-body">{result.body}</div>
        <div className="entry-recommend">
          {result.recommend ? <div><AiOutlineCheck />: I recommend this product</div> : null}
        </div>
        <div className="entry-response">
          {result.response === null || "" ? null : <div className="response-review">Response: {result.response}</div>}
        </div>
        <div className="entry-helpful-report-container">
          <div className="entry-helpful">Helpful? <a href="#" onClick={()=> {
            props.incrementHelpfulness(result.review_id, result.helpfulness);
            incremented(
              console.log("increment executed")
            );
          }}>Yes</a> ({result.helpfulness}) | </div>
          <div className="entry-report"><a href="#" onClick={()=> props.reportReview(result.review_id)}>Report</a></div>
        </div>
      </div>
      <hr></hr>
      <div className="entry-hr"></div>

    </div>
  )
}


const EntryReviewsStars = (props) => {
  // console.log('<ReviewsStars> with props', props);
  let rating = props.rating;
  let ratingRounded = (Math.round(rating * 4) / 4).toFixed(2);
  console.log('rating was ', rating, 'got rounded to ', ratingRounded);
  let starValues = ratingToArray(ratingRounded);

  let entryIndex = props.entryIndex;
  console.log('the star value array is', starValues);
  return (
    <>
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
    </>
  )

    //for rounding look in my github branch at calculateStars function - this rounds 3.73-> 3.75
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


export default ReviewsEntry;