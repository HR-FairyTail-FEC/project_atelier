import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
let placeHolderURL = 'https://cdn.shopify.com/s/files/1/0346/5945/products/Spec-Side_31cc55d4-d48d-4b7c-a26e-d9070210cc7c_5000x.png?v=1641417596'
import { ContainerRelated, Category, Name, Price, ImageContainer,LeftArrow, RightArrow, CarouselContainer}  from '../src/Styled Components/RelatedItems+Comparison/container-related.styled.js';
import { ContainerOutfit, AddToOutfit_Text, AddToOutfit_Button, ActionButtonX} from '../src/Styled Components/RelatedItems+Comparison/container-outfit.styled.js';
import {RelatedTitle, OutfitTitle, SpaceHolderColumn} from './Styled Components/RelatedItems+Comparison/container-related-outfit.styled.js';
import ActionButton_Star from './Related_ActionButton_Star.jsx';
import {callInteraction}from './Global_Interactions.js';


const Related = (props)=> {
  // console.log('in related with props', props);

    const [relatedEntries, setRelatedEntries] = useState([]);
    const [startIndexRelated, setStartIndexRelated] = useState(0);
    const [endIndexRelated, setEndIndexRelated] = useState(3);  //for carousel
    // const [outfitEntries, setOutfitEntries] = useState([]);
    const [outfitEntries, setOutfitEntries] = useState(JSON.parse(localStorage.getItem('outfitEntries')) || []);
    const [startIndexOutfit, setStartIndexOutfit] = useState(0);
    const [endIndexOutfit, setEndIndexOutfit] = useState(2);  //for carousel
    const navigate = useNavigate();
    useEffect(()=>{
      // console.log('<Related> useEffect')
        if (props.details.length !== 0){
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
            console.log('raw all promises holds', allData);
            let formattedData = formatData(allData);
            // console.log('this is what relatedEntries holds', formattedData);
            setRelatedEntries(formattedData);
          })
          localStorage.setItem('outfitEntries', JSON.stringify(outfitEntries)); //store it
        }
    },[props.details, outfitEntries]);

    return (
      <>
        <div>
          {/* {console.log('rendering <Related>')} */}
        </div>


        <div id="related-outfit-container">

          <div id="related-container">
            <RelatedTitle> RELATED PRODUCTS </RelatedTitle>
            <div id="related-items">
              {(startIndexRelated>0) ? <LeftArrow changeIndexFN={()=>changeIndex(['decrement', 'related'])}/> : <LeftArrow view={'onlyColumn'}/>}
              <SpaceHolderColumn></SpaceHolderColumn>
              <CarouselContainer>
                {relatedEntries.length ===0 ? <p> Loading... </p> : relatedEntriesMapped(startIndexRelated, endIndexRelated)}
              </CarouselContainer>
              {(endIndexRelated<relatedEntries.length-1) ? <RightArrow changeIndexFN={()=>changeIndex(['increment', 'related'])}/>: <RightArrow view={'onlyColumn'}/> }
            </div>
          </div>

          <div id="outfit-container">
            <OutfitTitle> YOUR OUTFIT</OutfitTitle>
            <div id="outfit-items">
              {(startIndexOutfit>0) ? <LeftArrow changeIndexFN={()=>changeIndex(['decrement', 'outfit'])}/> : <LeftArrow view={'onlyColumn'}/>}
              <SpaceHolderColumn></SpaceHolderColumn>
              <CarouselContainer>
                <ContainerOutfit>
                  <AddToOutfit_Button onClick={()=>{
                    AddToOutfit_Click();
                    callInteraction('Related Product AddToOutfit Button', 'Related Items & Comparison', new Date());
                  }}/>
                  <AddToOutfit_Text> Add to Outfit </AddToOutfit_Text>
                </ContainerOutfit>
                {(outfitEntries.length ===0) ? <></> : outfitEntriesMapped(startIndexOutfit, endIndexOutfit)}
              </CarouselContainer>
              {(endIndexOutfit<outfitEntries.length-1) ? <RightArrow changeIndexFN={()=>changeIndex(['increment', 'outfit'])}/>: <RightArrow view={'onlyColumn'}/> }
            </div>
          </div>

        </div>
      </>
    );

    function relatedEntriesMapped(startIndexRelated, endIndexRelated){
      return relatedEntries.slice(startIndexRelated,endIndexRelated+1).map((obj,index)=>{
        return (
            <ContainerRelated key={index} onClick={() => {
              handleContainerSelect(obj.id);
              callInteraction('Related Product Card', 'Related Items & Comparison', new Date());
            }}>
              <ImageContainer img={obj.thumbnailURL}></ImageContainer>
              <Category key={index}>{obj.category} </Category>
              <Name key={index}> {obj.name}</Name>
              <Price key={index}> ${obj.price} </Price>
              <Stars rating={obj.stars} instance={obj.instance} key={index}/>
              <ActionButton_Star key={index} index={index} mainProduct={props.details.product} relatedID={obj.id} relProductName={obj.name}/>
            </ContainerRelated>
        )
      })
    }
    function outfitEntriesMapped(startIndexOutfit, endIndexOutfit){
      return outfitEntries.slice(startIndexOutfit, endIndexOutfit+1).map((outfit,index)=>{
        return (
          <ContainerOutfit>
            <ImageContainer img={outfit.thumbnailURL} key={`outfit-${index}`}> </ImageContainer>
            <Category>{outfit.category} </Category>
            <Name> {outfit.name}</Name>
            <Price> ${outfit.price} </Price>
            <Stars rating={outfit.stars} instance={outfit.instance} key={index}/>
            <div className = "actionbutton-x">
              <ActionButtonX onClick={()=>{
                DeleteFromOutfit_Click(outfit.id);
                callInteraction('Related Product Outfit Card Remove Button', 'Related Items & Comparison', new Date());
              }}/>
            </div>
          </ContainerOutfit>
        )
      })
    }
    function changeIndex([action, whichCarousel]){
;      if (action ==='increment' && whichCarousel==='related'){
        // console.log('increment clicked', whichCarousel,  ' has last index ', relatedEntries.length-1);
        if (endIndexRelated < relatedEntries.length-1){
          setStartIndexRelated(prevCount=> prevCount+1);
          setEndIndexRelated(prevCount=>prevCount+1);
        }
      }
      if (action === 'decrement' && whichCarousel==='related'){
        // console.log('increment clicked', whichCarousel);
        if (startIndexRelated > 0 ){
          setStartIndexRelated(prevCount=> prevCount-1);
          setEndIndexRelated(prevCount=>prevCount-1);
        }
      }
      if (action ==='increment' && whichCarousel==='outfit'){
        // console.log('increment clicked', whichCarousel,  ' has last index ', outfitEntries.length-1);
        if (endIndexOutfit < outfitEntries.length-1){
          setStartIndexOutfit(prevCount=> prevCount+1);
          setEndIndexOutfit(prevCount=>prevCount+1);
        }
      }
      if (action === 'decrement' && whichCarousel==='outfit'){
        // console.log('increment clicked', whichCarousel);
        if (startIndexOutfit > 0 ){
          setStartIndexOutfit(prevCount=> prevCount-1);
          setEndIndexOutfit(prevCount=>prevCount-1);
        }
      }

    }
    function handleContainerSelect(event){
      navigate(`/products/${event}`);
      props.setProductID(event)
    };

    function AddToOutfit_Click(){
      let currentProduct = props.details.product;
      let currentReview = props.details.reviews;
      let currentStyle = props.details.styles;
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
      let addingOutfits = [...outfitEntries, formattedData];
      const uniqueOutfits = addingOutfits.filter((outfit, index) => {
        const _outfit = JSON.stringify(outfit);
        return index === addingOutfits.findIndex(obj => {
          return JSON.stringify(obj) === _outfit;
        });
      });
      setOutfitEntries(uniqueOutfits);
    }
    function DeleteFromOutfit_Click(idTarget){
      let copy = [...outfitEntries];
      for (let i =0; i<copy.length; i++){
        if (copy[i].id ===idTarget){
          copy.splice(i,1);
        }
      }
      setOutfitEntries(copy);
    }

};

function formatData(allData){
    let data = [];
    for (let i =0; i<allData.length;i = i+3){
      let averageStars = calculateStars(allData[i+1].data);//even is cnp data, odd has reviews
      let thumbnailURL = allData[i+2].data.results[0].photos[0].thumbnail_url || placeHolderURL;
      let instance = i/3;
      let dataObj = {
        id: allData[i].data.id,
        instance: instance,
        thumbnailURL: thumbnailURL,
        category: allData[i].data.category,
        name: allData[i].data.name,
        price: allData[i].data.default_price,
        stars: averageStars
      }
      data.push(dataObj);
    }
    return data;

};
function calculateStars(obj){
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
  return averageRounded;
}
function Stars(props) {
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
  let array = ['0%','0%','0%','0%','0%'];
  let whole = Math.floor(rating);
  let decimal = rating - whole;
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

export default Related;