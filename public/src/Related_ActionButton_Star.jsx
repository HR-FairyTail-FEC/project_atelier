import React, {useState, useEffect} from 'react';
import {ModalTitle, ComparingModal, TitleContainer,  TitleMain, TitleRelated, Features, Feature, CheckmarkRed} from './Styled Components/RelatedItems+Comparison/comparing-modal.styled.js';
import axios from 'axios';
import {callInteraction} from './Global_Interactions.js';

const ActionButton_Star = (props)=> {
  // console.log('<ActionButton_Star> with props', props);
  let mainProductName = props.mainProduct.name;
  let relProductName = props.relProductName;
  let mainProductFeatures = [...props.mainProduct.features];
  const [isActive, setActive] = useState(false);
  const [allFeatures, setAllFeatures] = useState([]);

  useEffect(()=>{
    // console.log('<ActionButtonStar> in UseEffect');
  },[]);

  let index = props.index;
    return (
      <>
        <div className="actionbutton-star" onClick={event => {
          event.stopPropagation();
          starClick();
          callInteraction('Related Product Card Action Button Compare Star', 'Related Items & Comparison', new Date());
        }}>
          <svg width="24px" height="24px" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="grad">
                <stop offset="100%" stopColor="white"/>
                <stop offset="0%" stopColor="black"/>
              </linearGradient>
            </defs>
            <path fill="url(#grad)" stroke="#000000"  strokeWidth="1.8px" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118 l11.547-1.2L16.026,0.6L20.388,10.918z"/>
          </svg>
        </div>

        <div className={isActive ? "star-modal-show" : "star-modal-hide"}>
          <ModalTitle> Comparing </ModalTitle>
          <ComparingModal>
            <TitleContainer>
              <TitleMain>{mainProductName}</TitleMain>
              <TitleRelated> {relProductName}</TitleRelated>
            </TitleContainer>
            <Features>
            {
              allFeatures.map(feature=>{
                return (
                  <>
                    <Feature> {feature.feature} : {feature.value}
                    {<CheckmarkRed side={feature.side} ></CheckmarkRed>}
                    </Feature>
                    <br></br>
                  </>

                )
              })
            }
            </Features>

          </ComparingModal>
        </div>
      </>

    )

  function starClick(){
    let relatedID = props.relatedID;
    axios.get(`http://${location.hostname}:3000/api/products/${relatedID}`).then(response=>{
      let relProductFeatures = response.data.features;
      return relProductFeatures;
    }).then((relProductFeatures)=>{
      // console.log('changingState');
      setActive((prevState) => !(prevState));
      for (const feature of mainProductFeatures){
        feature['side'] = 'left';
      }
      for (const feature of relProductFeatures){
        feature['side'] = 'right';
      }
      // console.log('mainFeatures looks like:',mainProductFeatures);
      // console.log('related product Features looks like:',relProductFeatures);
      setAllFeatures([...mainProductFeatures, ...relProductFeatures]);
    })
  }
};


export default ActionButton_Star;
