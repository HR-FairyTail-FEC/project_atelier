import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
let placeHolderURL = 'https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg'
import { ContainerRelated, Category, Name, Price, ImageContainer,LeftArrow, RightArrow, CarouselContainer}  from '../src/Styled Components/RelatedItems+Comparison/container-related.styled.js';
import { ContainerOutfit, AddToOutfit_Text, AddToOutfit_Button, ActionButtonX} from '../src/Styled Components/RelatedItems+Comparison/container-outfit.styled.js';
import ActionButton_Star from './Related_ActionButton_Star.jsx';


const Related = (props)=> {
  console.log('in related with props', props);
    const [relatedEntries, setRelatedEntries] = useState([]);
    const [startIndexRelated, setStartIndexRelated] = useState(0);
    const [endIndexRelated, setEndIndexRelated] = useState(3);  //for carousel
    // const [outfitEntries, setOutfitEntries] = useState([]);
    const [outfitEntries, setOutfitEntries] = useState(JSON.parse(localStorage.getItem('outfitEntries')));
    const [startIndexOutfit, setStartIndexOutfit] = useState(0);
    const [endIndexOutfit, setEndIndexOutfit] = useState(2);  //for carousel
    const navigate = useNavigate();
    useEffect(()=>{
      console.log('<Related> useEffect')
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
            // console.log('raw all promises holds', allData);
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
          {console.log('rendering <Related>')}
        </div>

        <ul>To Do
          <li>Group: </li>
          <li>Related Module: add currentStyle? to outfits list</li>
          <li>Related Module: fix errors key prop</li>
          <li>Related Module: hover effects</li>
          <li>Related Module: modal: if similar characteristic, remove duplicates, also put value instead of checkmarks</li>
          <li>Related Module: React Router: click on anywhere in div (besides action) will route to new product detail page</li>
        </ul>
        <br></br>
        <br></br>


        <div id="related-outfit-container">

          <div id="related-container">
            <div id="related-title"> <p> RELATED PRODUCTS</p> </div>
            <div id="related-items">
              {(startIndexRelated>0) ? <LeftArrow changeIndexFN={()=>changeIndex(['decrement', 'related'])}/> : <LeftArrow view={'onlyColumn'}/>}
              <CarouselContainer>
                {relatedEntries.length ===0 ? <p> Loading... </p> : relatedEntriesMapped(startIndexRelated, endIndexRelated)}
              </CarouselContainer>
              {(endIndexRelated<relatedEntries.length-1) ? <RightArrow changeIndexFN={()=>changeIndex(['increment', 'related'])}/>: <RightArrow view={'onlyColumn'}/> }
            </div>
          </div>

          <br></br>

          <div id="outfit-container">
            <div id="outfit-title"> <p> YOUR OUTFIT </p> </div>
            <div id="outfit-items">
              {(startIndexOutfit>0) ? <LeftArrow changeIndexFN={()=>changeIndex(['decrement', 'outfit'])}/> : <LeftArrow view={'onlyColumn'}/>}

              <CarouselContainer>
                <ContainerOutfit>
                  <AddToOutfit_Button onClick={AddToOutfit_Click}> </AddToOutfit_Button>
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
      // console.log('in relatedEntriesMapped');
      // console.log('sliced entries are', relatedEntries.slice(startIndexRelated, endIndexRelated+1));
      return relatedEntries.slice(startIndexRelated,endIndexRelated+1).map((obj,index)=>{
        return (
            <ContainerRelated key={index} onClick={() => handleImageSelect(obj.id)}>
              <ImageContainer img={obj.thumbnailURL}></ImageContainer>
              <Category key={index}>{obj.category} </Category>
              <Name key={index}> {obj.name}</Name>
              <Price key={index}> ${obj.price} </Price>
              <Stars rating={obj.stars} instance={obj.instance} key={index}/>
              <ActionButton_Star key={index} index={index} mainProduct={props.details.product} relatedID={obj.id} relProductName={obj.name}></ActionButton_Star>
            </ContainerRelated>
        )
      })
    }
    function outfitEntriesMapped(startIndexOutfit, endIndexOutfit){
      return outfitEntries.slice(startIndexOutfit, endIndexOutfit+1).map((outfit,index)=>{
        return (
          <ContainerOutfit>
            <ActionButtonX onClick={()=>DeleteFromOutfit_Click(outfit.id)}/>
            <ImageContainer img={outfit.thumbnailURL} key={`outfit-${index}`}> </ImageContainer>
            <Category>{outfit.category} </Category>
            <Name> {outfit.name}</Name>
            <Price> ${outfit.price} </Price>
            <Stars rating={outfit.stars} instance={outfit.instance} key={index}/>
          </ContainerOutfit>
        )
      })
    }
    function changeIndex([action, whichCarousel]){
      console.log('in changeIndex');
      if (action ==='increment' && whichCarousel==='related'){
        console.log('increment clicked', whichCarousel,  ' has last index ', relatedEntries.length-1);
        if (endIndexRelated < relatedEntries.length-1){
          setStartIndexRelated(prevCount=> prevCount+1);
          setEndIndexRelated(prevCount=>prevCount+1);
        }
      }
      if (action === 'decrement' && whichCarousel==='related'){
        console.log('increment clicked', whichCarousel);
        if (startIndexRelated > 0 ){
          setStartIndexRelated(prevCount=> prevCount-1);
          setEndIndexRelated(prevCount=>prevCount-1);
        }
      }
      if (action ==='increment' && whichCarousel==='outfit'){
        console.log('increment clicked', whichCarousel,  ' has last index ', outfitEntries.length-1);
        if (endIndexOutfit < outfitEntries.length-1){
          setStartIndexOutfit(prevCount=> prevCount+1);
          setEndIndexOutfit(prevCount=>prevCount+1);
        }
      }
      if (action === 'decrement' && whichCarousel==='outfit'){
        console.log('increment clicked', whichCarousel);
        if (startIndexOutfit > 0 ){
          setStartIndexOutfit(prevCount=> prevCount-1);
          setEndIndexOutfit(prevCount=>prevCount-1);
        }
      }

    }
    function handleImageSelect(event){
      console.log('clicked Div');
      navigate(`/products/${event}`);
      props.setProductID(event)

    };

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
    function DeleteFromOutfit_Click(idTarget){
      console.log('delete From outfit clicked on id', idTarget,'current outfitEntries is', outfitEntries);
      let copy = [...outfitEntries];
      for (let i =0; i<copy.length; i++){
        if (copy[i].id ===idTarget){
          copy.splice(i,1);
        }
      }
      setOutfitEntries(copy);
      console.log('deleted entry outfitEntries looks like', copy);
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