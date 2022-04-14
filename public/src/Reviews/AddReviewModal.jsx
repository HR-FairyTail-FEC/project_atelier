import React, { useState } from 'react';

const AddReviewModal = props => {
  const uniqueId = (char) => {
    let arr = [];
    let obj = {};
    if (char.Size) {arr.push(char.Size.id)}
    if (char.Width) {arr.push(char.Width.id)}
    if (char.Fit) {arr.push(char.Fit.id)}
    if (char.Length) {arr.push(char.Length.id)}
    if (char.Comfort) {arr.push(char.Comfort.id)}
    if (char.Quality) {arr.push(char.Quality.id)}
    arr.forEach(element => {
      obj[element] = 3;
    })
    return obj;
  }
  const uniqueIdArr = (char) => {
    let arr = [];
    if (char.Size) {arr.push(char.Size.id)}
    if (char.Width) {arr.push(char.Width.id)}
    if (char.Fit) {arr.push(char.Fit.id)}
    if (char.Length) {arr.push(char.Length.id)}
    if (char.Comfort) {arr.push(char.Comfort.id)}
    if (char.Quality) {arr.push(char.Quality.id)}
    return arr;
  }
  const uniqueIdObj = uniqueId(props.char);
  const uniqueIdInArr = uniqueIdArr(props.char);
  // console.log('uniqueIdInArr 3: ', uniqueIdInArr[3]);
  // console.log('uniqueIdObj: ', uniqueIdObj)

 const [review, setReview] = useState({
   product_id: props.product_id,
   rating: 0,
   summary: "",
   body: "",
   recommend: "",
   name: "",
   email: "",
   photos: [],
   characteristics: uniqueIdObj
 });
  // there should be a better way to do this. (learn dif between onclick, onchange, onsubmit, handlesubmit, handlechange)
  const handleChange  = event => {
    setReview({...review, [event.target.name]: event.target.value });
    console.log("whats in event.target: ", event.target)
  }

  const handleChangeChar = (event) => {
    setReview({...review, characteristics : { [event.target.name] : event.target.value} });
    console.log("whats in event.target: ", event.target.name)
  }

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

          {/************** refactor with map ********/}
          <h4 htmlFor="char">Characteristics</h4><br></br>
          <div>
          {props.char.Size ?
          <>
            <label htmlFor={uniqueIdInArr[0]}>Size</label><br></br>
                <input type="radio" name={uniqueIdInArr[0]} id="1" onChange={handleChangeChar} value="1"></input><label htmlFor="1">1</label>
                <input type="radio" name={uniqueIdInArr[0]} id="2" onChange={handleChangeChar} value="2"></input><label htmlFor="2">2</label>
                <input type="radio" name={uniqueIdInArr[0]} id="3" onChange={handleChangeChar} value="3"></input><label htmlFor="3">3</label>
                <input type="radio" name={uniqueIdInArr[0]} id="4" onChange={handleChangeChar} value="4"></input><label htmlFor="4">4</label>
                <input type="radio" name={uniqueIdInArr[0]} id="5" onChange={handleChangeChar} value="5"></input><label htmlFor="5">5</label><br></br>

            <label htmlFor={uniqueIdInArr[1]}>Width</label><br></br>
                <input type="radio" name={uniqueIdInArr[1]} id="1" onChange={handleChangeChar} value="1"></input><label htmlFor="1">1</label>
                <input type="radio" name={uniqueIdInArr[1]} id="2" onChange={handleChangeChar} value="2"></input><label htmlFor="2">2</label>
                <input type="radio" name={uniqueIdInArr[1]} id="3" onChange={handleChangeChar} value="3"></input><label htmlFor="3">3</label>
                <input type="radio" name={uniqueIdInArr[1]} id="4" onChange={handleChangeChar} value="4"></input><label htmlFor="4">4</label>
                <input type="radio" name={uniqueIdInArr[1]} id="5" onChange={handleChangeChar} value="5"></input><label htmlFor="5">5</label><br></br>
                </>
              : null
            }
            </div>


          <div>
            {props.char.Fit ?
            <>
            <label htmlFor={uniqueIdInArr[0]}>Fit</label><br></br>
              <input type="radio" name={uniqueIdInArr[0]} id="1" onChange={handleChangeChar} value="1"></input><label htmlFor="1">1</label>
              <input type="radio" name={uniqueIdInArr[0]} id="2" onChange={handleChangeChar} value="2"></input><label htmlFor="2">2</label>
              <input type="radio" name={uniqueIdInArr[0]} id="3" onChange={handleChangeChar} value="3"></input><label htmlFor="3">3</label>
              <input type="radio" name={uniqueIdInArr[0]} id="4" onChange={handleChangeChar} value="4"></input><label htmlFor="4">4</label>
              <input type="radio" name={uniqueIdInArr[0]} id="5" onChange={handleChangeChar} value="5"></input><label htmlFor="5">5</label><br></br>

            <label htmlFor={uniqueIdInArr[1]}>Length</label><br></br>
              <input type="radio" name={uniqueIdInArr[1]} id="1" onChange={handleChangeChar} value="1"></input><label htmlFor="1">1</label>
              <input type="radio" name={uniqueIdInArr[1]} id="2" onChange={handleChangeChar} value="2"></input><label htmlFor="2">2</label>
              <input type="radio" name={uniqueIdInArr[1]} id="3" onChange={handleChangeChar} value="3"></input><label htmlFor="3">3</label>
              <input type="radio" name={uniqueIdInArr[1]} id="4" onChange={handleChangeChar} value="4"></input><label htmlFor="4">4</label>
              <input type="radio" name={uniqueIdInArr[1]} id="5" onChange={handleChangeChar} value="5"></input><label htmlFor="5">5</label><br></br>

            </>
              : null
            }
            </div>

            <label htmlFor={uniqueIdInArr[2]}>Comfort</label><br></br>
              <input type="radio" name={uniqueIdInArr[2]} id="1" onChange={handleChangeChar} value="1"></input><label htmlFor="1">1</label>
              <input type="radio" name={uniqueIdInArr[2]} id="2" onChange={handleChangeChar} value="2"></input><label htmlFor="2">2</label>
              <input type="radio" name={uniqueIdInArr[2]} id="3" onChange={handleChangeChar} value="3"></input><label htmlFor="3">3</label>
              <input type="radio" name={uniqueIdInArr[2]} id="4" onChange={handleChangeChar} value="4"></input><label htmlFor="4">4</label>
              <input type="radio" name={uniqueIdInArr[2]} id="5" onChange={handleChangeChar} value="5"></input><label htmlFor="5">5</label><br></br>

            <label htmlFor={uniqueIdInArr[3]}>Quality</label><br></br>
              <input type="radio" name={uniqueIdInArr[3]} id="1" onChange={handleChangeChar} value="1"></input><label htmlFor="1">1</label>
              <input type="radio" name={uniqueIdInArr[3]} id="2" onChange={handleChangeChar} value="2"></input><label htmlFor="2">2</label>
              <input type="radio" name={uniqueIdInArr[3]} id="3" onChange={handleChangeChar} value="3"></input><label htmlFor="3">3</label>
              <input type="radio" name={uniqueIdInArr[3]} id="4" onChange={handleChangeChar} value="4"></input><label htmlFor="4">4</label>
              <input type="radio" name={uniqueIdInArr[3]} id="5" onChange={handleChangeChar} value="5"></input><label htmlFor="5">5</label><br></br>


            <label htmlFor="summary">Summary</label><br></br>
              <input className="add-review-text" type="text" name="summary" placeholder="Example: Best Purchase ever!" onChange={handleChange}></input><br></br>

            <label htmlFor="body">Comment*</label><br></br>
              <textarea type="text" name="body" placeholder="Why did you like the product or not?" onChange={handleChange} ></textarea><br></br>

            {/* <label htmlFor="photo">Upload your photos</label><br></br> */}

            <label htmlFor="name">ID*</label><br></br>
              <input className="add-review-text" type="text" name="name" placeholder="Example: jackson11!" onChange={handleChange}></input><br></br>

            <label htmlFor="email">Email Address*</label><br></br>
              <input className="add-review-text" type="email" name="email" placeholder="Example: jackson11@email.com" onChange={handleChange}></input><br></br>

            <button type='button' onClick={()=> {props.addReview(review); props.onClose(); }}>Submit</button>
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