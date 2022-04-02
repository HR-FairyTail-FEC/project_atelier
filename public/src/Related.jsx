import React, {useState, useEffect} from 'react';
import axios from 'axios';
let placeHolderURL = 'https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg'
import { ContainerRelated } from '../src/Styled Components/RelatedItems+Comparison/container-related.styled.js';



const Related = (props)=> {
  // console.log('in related with props', props);

    const [HTMLText, setHTMLText] = useState([]);
    useEffect(()=>{
        if (props.details.length === 0) {
          setHTMLText([]);
        }
        else {
          let related = props.details.related;
          let promisesArr = [];
          related.forEach((relatedID) => {
            // console.log('calling relatedID', relatedID);
            promisesArr.push(axios.get(`http://localhost:3000/api/products/${relatedID}`)); //c n p
            promisesArr.push(axios.get(`http://localhost:3000/api/reviews?product_id=${relatedID}`)); //for reviews
            promisesArr.push(axios.get(`http://localhost:3000/api/products/${relatedID}/styles`)) //for thumbnail in
          });
          Promise.all(promisesArr).then((allData)=>{
            return formatData(allData);
          }).then((value)=>{
            console.log('second then value is', value);
            setHTMLText(value);
          })
        }
    },[props.details]);

    return (
      <div id="related-outfit-container">
        <div id="related-container">
          <div id="related-title">
            <p> RELATED PRODUCTS</p>
          </div>
          <div id="related-items">
            {
              HTMLText.length ===0 ? <p> Loading... </p> :
              HTMLText.map((obj,index)=>{
                return (
                  <ContainerRelated>
                    <img src={obj.thumbnailURL} alt="item" width="50%" height="50%"/>
                    <p> {obj.category} </p>
                    <p> {obj.name}</p>
                    <p> ${obj.price}</p>
                    <p> {obj.stars} stars </p>
                  </ContainerRelated>


                    )
              })
            }
          </div>
        </div>

        <div id="outfit-container">
        </div>

      </div>

    );
};


function formatData(allData){
  console.log('in formatData with data', allData);
    let data = [];
    for (let i =0; i<allData.length;i = i+3){
      let averageStars = calculateStars(allData[i+1].data);//even is cnp data, odd has reviews
      let thumbnailURL = allData[i+2].data.results[0].photos[0].thumbnail_url || placeHolderURL;
      console.log(thumbnailURL);
      let dataObj = {
        thumbnailURL: thumbnailURL,
        category: allData[i].data.category,
        name: allData[i].data.name,
        price: allData[i].data.default_price,
        stars: averageStars
      }
      console.log('dataobj being pushed is', dataObj);
      data.push(dataObj);
    }
    console.log('data array', data);
    return data;

};

function calculateStars(obj){
  let count = obj.count;
  if (count === 0) return undefined;
  let sum = 0;
  let allRatings = obj.results;
  for (const entry of allRatings){
    sum += entry.rating;
  }
  if (sum===0) return undefined;
  let average = sum/count;
  let averageRounded = (Math.round(average * 4) / 4).toFixed(2);
  // console.log('averageRounded is calulcated', averageRounded);
  return averageRounded;
}


export default Related;