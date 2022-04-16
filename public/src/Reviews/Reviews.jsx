import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReviewsEntry from './ReviewsEntry.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddReviewModal from './AddReviewModal.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewsStars from './ReviewsStars.jsx';
import CharBar from './CharBar.jsx';

const Reviews = (props) => {
  const [reviewList, setReviewList] = useState([]);
  const [option, setOption] = useState('relevant');
  const [show, setShow] = useState(false);
  const [numOfEntry, setNumOfEntry] = useState(2);
  const [post, setPost] = useState(false);
  const [helpfulCLicked, setHelpfulClicked] = useState([]);
  let display;
  const { id } = useParams();
  useEffect(() => {
    const promises = [];
    let result = [];
    const endpointsSortReviews = [`/api/reviews?product_id=${id}&sort=relevant`, `/api/reviews?product_id=${id}&sort=newest`, `/api/reviews?product_id=${id}&sort=helpfulness`, `/api/reviews/meta?product_id=${id}`];
    const fetchData = async () => {
      for (let i = 0; i < endpointsSortReviews.length; i++) {
        promises.push(axios.get(`http://localhost:3000${endpointsSortReviews[i]}`))
      }
      const data = await Promise.all(promises);
      data.forEach((item) => {
        result = [...result, item.data]
      });
      const relevantArr = result[0].results; const newestArr = result[1].results; const helpfulnessArr = result[2].results;
          if (option === 'relevant') {
            setReviewList(relevantArr);
          } else if (option === 'newest') {
            setReviewList(newestArr);
          } else if (option === 'helpfulness') {
            setReviewList(helpfulnessArr);
          }
    }
    fetchData()
  }, [option, post])

  const addReview = (reviewInfo) => {
    console.log('reviewInfo: ', reviewInfo)
    axios.post(`http://localhost:3000/api/reviews`, {
      product_id: Number(reviewInfo.product_id),
      rating: Number(reviewInfo.rating),
      summary: reviewInfo.summary,
      body: reviewInfo.body,
      recommend: JSON.parse(reviewInfo.recommend),
      name: reviewInfo.name,
      email: reviewInfo.email,
      photos: reviewInfo.photos,
      characteristics: reviewInfo.characteristics
    })
    .then(response => {
      // console.log("response.data from addReview, ", response)
      setPost(!post)
    })
    .catch(err => {
      console.log("err from addReview", err)
    })
  }

  const moreReviews = () => {
    setNumOfEntry(numOfEntry + 2)
  }

  const changeOption = (event) => {
    setOption(event.target.value);
  }

  const incrementHelpfulness = (review_id) => {
    setHelpfulClicked(prevItem => [...prevItem, review_id]);
    axios.put(`http://localhost:3000/api/reviews/${review_id}/helpful`)
    .then(response => {
      setPost(!post)
    })
    .catch(err => {
      console.log('oh my..its err: ', err)
    })
  }

  const reportReview = (review_id) => {
    console.log('review id for report: ', review_id)
    axios.put(`http://localhost:3000/api/reviews/${review_id}/report`)
    .then(response => {
      // console.log('response from report: ', response)
      alert("The review has been reported!")
      setPost(!post)
    })
    .catch(err => {
      console.log('err from report frontend: ', err)
    })
  }

  const averageRatingCalc = (ratingObj) => {
    if (ratingObj[1] === undefined) { ratingObj[1] = 0; }
    else if (ratingObj[2] === undefined) { ratingObj[2] = 0;}
    else if (ratingObj[3] === undefined) { ratingObj[3] = 0;}
    else if (ratingObj[4] === undefined) { ratingObj[4] = 0;}
    else if (ratingObj[5] === undefined) { ratingObj[5] = 0;}
    let average = 0;
    let sumOfRatings = (1*ratingObj[1] + 2*ratingObj[2] + 3*ratingObj[3] + 4*ratingObj[4] + 5*ratingObj[5])
    let totalNumOfRatings = Number(ratingObj[1]) + Number(ratingObj[2])+ Number(ratingObj[3])+ Number(ratingObj[4])+ Number(ratingObj[5]);
    average = sumOfRatings / totalNumOfRatings;
    let slicedAver = average.toString().slice(0, 4);
    let finalAver = Math.round((Number(slicedAver) * 10)) / 10;
    return finalAver;
  }

  const recommendPercent = (metaRecObj) => {
    let percent = 0;
    percent = metaRecObj.true / (Number(metaRecObj.true) + Number(metaRecObj.false))
    percent = Math.round(percent * 100);
    return percent;
  }

  const ratingBreakdownPercent = (obj) => {
    if (obj[1] === undefined) { obj[1] = 0; }
    else if (obj[2] === undefined) { obj[2] = 0;}
    else if (obj[3] === undefined) { obj[3] = 0;}
    else if (obj[4] === undefined) { obj[4] = 0;}
    else if (obj[5] === undefined) { obj[5] = 0;}
    let totalNumOfRatings = Number(obj[1]) + Number(obj[2])+ Number(obj[3])+ Number(obj[4])+ Number(obj[5]);
    let arr = [];
    let valuesArr = Object.values(obj);
    for (var i = 0; i < valuesArr.length; i++) {
      arr.push((valuesArr[i] / totalNumOfRatings * 100) + `%`)
    }
    return arr;
  }

  const charBarPercent = (obj) => {
    if (obj.Size) { obj.Size.valueInPer = Math.round((obj.Size.value / 5) * 100) + `%`}
    if (obj.Width) { obj.Width.valueInPer = Math.round((obj.Width.value / 5) * 100) + `%`}
    if (obj.Fit) { obj.Fit.valueInPer = Math.round((obj.Fit.value / 5) * 100) + `%`}
    if (obj.Length) { obj.Length.valueInPer = Math.round((obj.Length.value / 5) * 100) + `%`}
    if (obj.Comfort) { obj.Comfort.valueInPer = Math.round((obj.Comfort.value / 5) * 100) + `%`}
    if (obj.Quality) { obj.Quality.valueInPer = Math.round((obj.Quality.value / 5) * 100) + `%`}
    return obj;

  }

  if (reviewList.length === 0) {
    display =
      <>
        {/* <div>Loading...</div> */}
      </>
  } else {
    display =
    <div className="dk-container">
        <div className="title-review">RATINGS & REVIEWS</div>
          <div className="rating-container">
            <div className="left-side">
                <div className="rating-breakdown">
                  <h1 className="rating-breakdown-number">{averageRatingCalc(props.details.meta.ratings)}</h1>
                  <ReviewsStars rating={averageRatingCalc(props.details.meta.ratings)} />
                </div>
                <div className="recommendation">
                  {recommendPercent(props.details.meta.recommended)}% of reviews recommend this product
                </div>
                <RatingBreakdown ratingBreakdownPercent={ratingBreakdownPercent(props.details.meta.ratings)} />
                <CharBar charBarPercent={charBarPercent(props.details.meta.characteristics)}/>
            </div>
            <div className="middle-column">
            </div>
            <div className="right-side">
              <div className="right-top">
                {reviewList.length} reviews, sorted by
                <select onChange={changeOption} value={option} className="review-dropdown">
                  <option value="relevant">relevance</option>
                  <option value="newest">newest</option>
                  <option value="helpfulness">helpful</option>
                </select>
              </div>
              <div className="review-entries">
                {/* {console.log(details.reviews)} */}
                {reviewList.slice(0, numOfEntry).map((result, index) =>
                  <ReviewsEntry key={index} result={result} reportReview={reportReview} index={index} incrementHelpfulness={incrementHelpfulness} />
                )}
              </div>
              <div className="review-button-container">
                <button onClick={() => moreReviews()} className="review-button">More Reviews</button>
                <button onClick={() => setShow(true)} className="review-button">Add A Review</button>
                <AddReviewModal char={props.details.meta.characteristics} addReview={addReview} product_id={props.details.questions.product_id} onClose={() => setShow(false)} show={show} />
              </div>
            </div>
          </div>
    </div>
  }

  return (
    <>
      {/* {console.log({reviewList})} */}
      {display}
    </>
  )
}

export default Reviews;
