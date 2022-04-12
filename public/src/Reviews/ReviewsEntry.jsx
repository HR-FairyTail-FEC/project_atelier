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
    <div className="reviewEntryBorder">
       {console.log("props.result from Entry: ", result)}
       {/* {console.log("props.result.helpfulness from Entry: ", result.helpfulness)} */}
      <ReviewsStars rating={result.rating} entryIndex={entryIndex}/>
      <span> {result.reviewer_name}, {moment(result.date).format('LL')}</span>
      <h3>{result.summary}</h3>
      <div>{result.body}</div>
      {result.recommend ? <div><AiOutlineCheck />: I recommend this product</div> : null}
      {result.response === null || "" ? null : <div className="response-review">Response: {result.response}</div>}
      <span>Helpful? <a href="#" onClick={()=> {
         props.incrementHelpfulness(result.review_id, result.helpfulness);
         incremented(
           console.log("increment executed")
         );
      }}>Yes</a> ({result.helpfulness}) | </span>
      <span><a href="#" onClick={()=> props.reportReview(result.review_id)}>Report</a></span>
      <hr style={{border: "3px solid black"}}></hr>
    </div>
  )
}

export default ReviewsEntry;