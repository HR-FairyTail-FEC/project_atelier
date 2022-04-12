import React, { useState } from 'react';

const AddReviewModal = props => {

 const [review, setReview] = useState({
   product_id: props.product_id,
   rating: 0,
   recommend: "",
   summary: "",
   body: "",
   name: "",
   email: ""
  //  photos: []
  //  characteristics: {
  //     id: idGenerator(),
  //     value: 0
  //  }
 });
  // there should be a better way to do this. (learn dif between onclick, onchange, onsubmit, handlesubmit, handlechange)
  const handleChange  = event => {
    // console.log(`handled!`);
    setReview({...review, [event.target.name]: event.target.value });
  }

  // const handleChangeChar = event => {

  // }

  // const idGenerator = () => {

  // }

  if (!props.show) {
    return null;
  }
// cloudinary tutorial
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Write Your Review</h4>
        </div>
        <div className="modal-body">
          <form>
            <label htmlFor="rating">Overall rating*</label><br></br>
              <input type="radio" name="rating" id="1" onChange={handleChange} value="1"></input><label htmlFor="1">1</label>
              <input type="radio" name="rating" id="2" onChange={handleChange} value="2"></input><label htmlFor="2">2</label>
              <input type="radio" name="rating" id="3" onChange={handleChange} value="3"></input><label htmlFor="3">3</label>
              <input type="radio" name="rating" id="4" onChange={handleChange} value="4"></input><label htmlFor="4">4</label>
              <input type="radio" name="rating" id="5" onChange={handleChange} value="5"></input><label htmlFor="5">5</label><br></br>

            <label htmlFor="recommend">Do you recommmend this product?*</label><br></br>
              <input type="radio" name="recommend" id="true" onChange={handleChange} value="true"></input><label htmlFor="true">Yes</label>
              <input type="radio" name="recommend" id="false" onChange={handleChange} value="false"></input><label htmlFor="false">No</label><br></br>

            <h4 htmlFor="char">Characteristics</h4><br></br>
              <label htmlFor="char">Fit</label><br></br>
                <input type="radio" name="char" id="1" onChange={handleChange} value="1"></input><label htmlFor="1">1</label>
                <input type="radio" name="char" id="2" onChange={handleChange} value="2"></input><label htmlFor="2">2</label>
                <input type="radio" name="char" id="3" onChange={handleChange} value="3"></input><label htmlFor="3">3</label>
                <input type="radio" name="char" id="4" onChange={handleChange} value="4"></input><label htmlFor="4">4</label>
                <input type="radio" name="char" id="5" onChange={handleChange} value="5"></input><label htmlFor="5">5</label><br></br>

              <label htmlFor="char">Length</label><br></br>
                <input type="radio" name="char" id="1" onChange={handleChange} value="1"></input><label htmlFor="1">1</label>
                <input type="radio" name="char" id="2" onChange={handleChange} value="2"></input><label htmlFor="2">2</label>
                <input type="radio" name="char" id="3" onChange={handleChange} value="3"></input><label htmlFor="3">3</label>
                <input type="radio" name="char" id="4" onChange={handleChange} value="4"></input><label htmlFor="4">4</label>
                <input type="radio" name="char" id="5" onChange={handleChange} value="5"></input><label htmlFor="5">5</label><br></br>

              <label htmlFor="char">Comfort</label><br></br>
                <input type="radio" name="char" id="1" onChange={handleChange} value="1"></input><label htmlFor="1">1</label>
                <input type="radio" name="char" id="2" onChange={handleChange} value="2"></input><label htmlFor="2">2</label>
                <input type="radio" name="char" id="3" onChange={handleChange} value="3"></input><label htmlFor="3">3</label>
                <input type="radio" name="char" id="4" onChange={handleChange} value="4"></input><label htmlFor="4">4</label>
                <input type="radio" name="char" id="5" onChange={handleChange} value="5"></input><label htmlFor="5">5</label><br></br>

              <label htmlFor="char">Quality</label><br></br>
                <input type="radio" name="char" id="1" onChange={handleChange} value="1"></input><label htmlFor="1">1</label>
                <input type="radio" name="char" id="2" onChange={handleChange} value="2"></input><label htmlFor="2">2</label>
                <input type="radio" name="char" id="3" onChange={handleChange} value="3"></input><label htmlFor="3">3</label>
                <input type="radio" name="char" id="4" onChange={handleChange} value="4"></input><label htmlFor="4">4</label>
                <input type="radio" name="char" id="5" onChange={handleChange} value="5"></input><label htmlFor="5">5</label><br></br>

            <label htmlFor="summary">Summary</label><br></br>
              <input className="add-review-text" type="text" name="summary" placeholder="Example: Best Purchase ever!" onChange={handleChange}></input><br></br>

            <label htmlFor="body">Comment*</label><br></br>
              <textarea type="text" name="body" placeholder="Why did you like the product or not?" onChange={handleChange} ></textarea><br></br>

            {/* <label htmlFor="photo">Upload your photos</label><br></br> */}

            <label htmlFor="name">ID*</label><br></br>
              <input className="add-review-text" type="text" name="name" placeholder="Example: jackson11!" onChange={handleChange}></input><br></br>

            <label htmlFor="email">Email Address*</label><br></br>
              <input className="add-review-text" type="email" name="email" placeholder="Example: jackson11@email.com" onChange={handleChange}></input><br></br>

            <input type="submit" value="SSUBMIT"></input>
            {console.log("addReview: ", review)}
            <button onClick={()=> props.addReview(review)}>Submit</button>
          </form>
        </div>
        <div className="modal-footer">
          <button className="button" onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default AddReviewModal;