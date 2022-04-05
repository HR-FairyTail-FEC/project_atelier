import React, {useState, useEffect} from 'react';
import axios from 'axios';
let placeHolderURL = 'https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg'
import { ContainerRelated, Category, Name, Price, ImageContainer} from '../src/Styled Components/RelatedItems+Comparison/container-related.styled.js';
import { ContainerOutfit, AddToOutfit_Text, AddToOutfit_Button} from '../src/Styled Components/RelatedItems+Comparison/container-outfit.styled.js';
import ActionButton_Star from './Related_ActionButton_Star.jsx';


const Related = (props)=> {
  console.log('in related with props', props);
    const [relatedEntries, setRelatedEntries] = useState([]); //looks like
    const [outfitEntries, setOutfitEntries] = useState([]);

    useEffect(()=>{
        if (props.details.length === 0) {
          setRelatedEntries([]);
        }
        else {
          let related = props.details.related;
          let promisesArr = [];
          related.forEach((relatedID) => {
            // console.log('calling relatedID', relatedID);
            promisesArr.push(axios.get(`http://localhost:3000/api/products/${relatedID}`)); //c n p
            // promisesArr.push(axios.get(`http://localhost:3000/api/reviews?product_id=${relatedID}`)); //for reviews
            promisesArr.push(axios.get(`http://localhost:3000/api/reviews/meta?product_id=${relatedID}`)); //for reviews
            promisesArr.push(axios.get(`http://localhost:3000/api/products/${relatedID}/styles`)); //for thumbnail in
          });
          Promise.all(promisesArr).then((allData)=>{
            // console.log('raw all promises holds', allData);
            let formattedData = formatData(allData);
            // console.log('this is what relatedEntries holds', formattedData);
            setRelatedEntries(formattedData);
          })
        }
    },[props.details], outfitEntries);

    return (
      <>
        <div id="related-outfit-container">
          <div id="related-container">
            <div id="related-title">
              <p> RELATED PRODUCTS</p>
            </div>
            <div id="related-items">
              {
                relatedEntries.length ===0 ? <p> Loading... </p> :
                relatedEntries.map((obj,index)=>{
                  return (
                    <>
                      <ContainerRelated>
                        <ImageContainer img={obj.thumbnailURL}>
                        </ImageContainer>
                        <Category>{obj.category} </Category>
                        <Name> {obj.name}</Name>
                        <Price> ${obj.price} </Price>
                        <Stars rating={obj.stars} instance={obj.instance} key={index}/>
                        <ActionButton_Star key={index} index={index} mainProduct={props.details.product} relatedID={obj.id}></ActionButton_Star>
                      </ContainerRelated>
                    </>
                      )
                })
              }
            </div>
          </div>

          <br></br>

          <div id="outfit-container">
            <div id="outfit-title">
              <p> YOUR OUTFIT </p>
            </div>
            <div id="outfit-items">
            {
              (
                <>
                <ContainerOutfit>
                  <AddToOutfit_Button onClick={AddToOutfit_Click}> PLUS SYMBOL </AddToOutfit_Button>
                  <AddToOutfit_Text> Add to Outfit </AddToOutfit_Text>
                </ContainerOutfit>
                {
                  outfitEntries.length ===0 ? <></> :
                  outfitEntries.map((outfit,index)=>{
                    return (
                      <>
                        <ContainerOutfit>
                          <ImageContainer img={outfit.thumbnailURL}> </ImageContainer>
                          <Category>{outfit.category} </Category>
                          <Name> {outfit.name}</Name>
                          <Price> ${outfit.price} </Price>
                          <Stars rating={outfit.stars} instance={outfit.instance} key={index}/>
                        </ContainerOutfit>
                      </>
                    )
                  })
                }
                </>
              )

            }
            </div>
          </div>
        </div>
      </>
    );

    function AddToOutfit_Click(){
      let currentProduct = props.details.product;
      let currentReview = props.details.reviews;
      let currentStyle = props.details.styles;
      // console.log(' button clicked with currentProduct', currentProduct);
      // console.log(' state of outfitEntries is', outfitEntries);
      let cnp = {
        data: currentProduct
      }
      let review = {
        data: currentReview
      }
      let style = {
        data: currentStyle
      }
      let allData = [cnp, review, style];

      let formattedData = formatData(allData)[0];
      // console.log(' in AddToOutfitClick_ formattedData is', formattedData);
      let addingOutfits = [...outfitEntries, formattedData];

      const uniqueOutfits = addingOutfits.filter((outfit, index) => {
        const _outfit = JSON.stringify(outfit);
        return index === addingOutfits.findIndex(obj => {
          return JSON.stringify(obj) === _outfit;
        });
      });
      // console.log(uniqueOutfits);
      setOutfitEntries(uniqueOutfits);



    }

};

function formatData(allData){
  // console.log('in formatData with data', allData);
    let data = [];
    for (let i =0; i<allData.length;i = i+3){
      let averageStars = calculateStars(allData[i+1].data);//even is cnp data, odd has reviews
      let thumbnailURL = allData[i+2].data.results[0].photos[0].thumbnail_url || placeHolderURL;
      let instance = i/3;
      // console.log('instance is', instance);
      // console.log(thumbnailURL);
      let dataObj = {
        id: allData[i].data.id,
        instance: instance,
        thumbnailURL: thumbnailURL,
        category: allData[i].data.category,
        name: allData[i].data.name,
        price: allData[i].data.default_price,
        stars: averageStars
      }
      // console.log('dataobj being pushed is', dataObj);
      data.push(dataObj);
    }
    // console.log('data array', data);
    return data;

};
function calculateStars(obj){
  // console.log('in calculate stars with obj', obj);
  let ratings = obj.ratings;
  let totalStars = 0;
  let totalReviews = 0;
  for (const starValue in ratings) {
    let reviewsPerStar = parseInt(ratings[starValue]);
    totalReviews += reviewsPerStar;
    let starWeight = reviewsPerStar * starValue;
    totalStars += starWeight;
  }
  let average = totalStars/totalReviews;
  let averageRounded = (Math.round(average * 4) / 4).toFixed(2);
  // console.log('averageRounded is', averageRounded);
  return averageRounded;
}
function Stars(props) {
  // console.log('in <Stars> with props', props);
  // console.log('in stars component with rating', props.rating,' instance', props.instance);
  let instance = props.instance;
  let rating = props.rating;
  let starValues = ratingToArray(rating);
  return (
    <div className='star-container'>
      {
        starValues.map((percentage,index)=>{
          return (
            <div className="star">
              <svg width="24px" height="24px" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient id={`${instance}_grad${index}`}>
                      <stop offset={`${percentage}`} stopColor="black"/>
                      <stop offset={`${percentage}`} stopColor="white"/>
                    </linearGradient>
                  </defs>
                  <path fill={`url(#${instance}_grad${index})`} stroke="#646464"  strokeWidth="0.3px"
                  d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
                  l11.547-1.2L16.026,0.6L20.388,10.918z"/>
              </svg>
            </div>
          )
        })
      }
    </div>
  )
}
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
  let percentage = decimalToPercentage[decimal];
  array[whole] = percentage;
  // console.log('array is', array);
  return array;
}





export default Related;