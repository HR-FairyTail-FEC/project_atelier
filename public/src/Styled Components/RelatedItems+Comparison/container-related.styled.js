import React from 'react';
import styled from "styled-components";
import {callInteraction} from '../../Global_Interactions.js';


const ContainerRelated = styled.div`
  border: 2px solid rgba(0,0,0,0.3);
  margin-left: 15px;
  margin-right: 15px;
  width: 250px;
  height: 370px;
  font-family: 'Lato', sans-serif;
  position: relative;
  /* background-color: yellow; */
  box-shadow: 0.3em 0.3em 1em rgba(0,0,0,0.3);

`;

console.log('access image container');
const ImageContainer = styled.div`
  /* border-style:solid; */
  /* background-color:blue; */
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 150px;
  right:10px;
  background-image: url(${props=>props.img});
  background-size: contain;
  background-repeat:no-repeat;
  background-position-x: center;
  background-position-y: center;
  /* background-size: 100% 100%; //scale to square, comment top 4 */
`;

const Category = styled.p`
  font-weight: lighter;
  position: absolute;
  bottom: 120px;
  left: 10px;
`;

const Name = styled.p`
  /* border-style:solid; */
  font-weight: bold;
  font-size:21px;
  position: absolute;
  top: 245px;
  left: 10px;
  height:60px;
`;

const Price = styled.p`
  font-weight: 300;
  position: absolute;
  font-weight: 300;
  bottom: 76px;
  left: 10px;
`;

const LeftArrowCol = styled.div`
  /* border-style:solid; */
  /* background-color: red; */
  width:50px;
  position: relative;
`;

const LeftArrowDiv = styled.div`
  /* border-style:dotted; */
  /* background-color: blue; */
  border: 2px solid rgba(0,0,0,0.3);
  padding:10px;
  position: absolute;
  width:60px;
  height:60px;
  bottom: calc((100%/2));
  box-shadow: 0px 7.5px 5px rgba(0,0,0,0.3);
  :hover {
  border: 2px solid black;
  transform: scale(1.1);
  }
`;

const LeftArrow=(props)=>{
  if (props.view ==='onlyColumn'){
    return (
      <LeftArrowCol/>
    )
  }
  // console.log('left arrow props are', props);
  let parentFunction = props.changeIndexFN;
  return (
    <LeftArrowCol>
      <LeftArrowDiv onClick={()=>{
        console.log('left arrow clicked');
        parentFunction();
        callInteraction('Related Product Carousel Left or Right Button', 'Related Items & Comparison', new Date());

      }}>
        <svg x="0px" y="0px" viewBox="0 0 512 512" >
          <path d="M168.837,256L388.418,36.418c8.331-8.331,8.331-21.839,0-30.17c-8.331-8.331-21.839-8.331-30.17,0L123.582,240.915 c-8.331,8.331-8.331,21.839,0,30.17l234.667,234.667c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17 L168.837,256z"/>
        </svg>
      </LeftArrowDiv>
    </LeftArrowCol>

  )
}

const RightArrowCol = styled.div`
  /* background-color: red; */
  /* border-style:solid; */
  width:50px;
  position: relative;
`;
const RightArrowDiv = styled.div`
  border: 2px solid rgba(0,0,0,0.3);
  padding:10px;
  position: absolute;
  width:60px;
  height:60px;
  bottom: calc((100%/2));
  box-shadow: 0px 7.5px 5px rgba(0,0,0,0.3);
  :hover {
  border: 2px solid black;
  transform: scale(1.1);
  }
`;
const RightArrow=(props)=>{
  if (props.view ==='onlyColumn'){
    return (
      <RightArrowCol/>
    )
  }
  let parentFunction = props.changeIndexFN;
  return (
    <RightArrowCol>
      <RightArrowDiv onClick={()=>{
        parentFunction();
        callInteraction('Related Product Carousel Left or Right Button', 'Related Items & Comparison', new Date());
      }}>
        <svg x="0px" y="0px" viewBox="0 0 512 512" >
          <path d="M388.418,240.915L153.752,6.248c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17L343.163,256
          L123.582,475.582c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0l234.667-234.667
          C396.749,262.754,396.749,249.246,388.418,240.915z"/>
        </svg>
      </RightArrowDiv>

    </RightArrowCol>
  )
}

const CarouselContainer = styled.div`
  display:flex;
  width:1252px;
  /* background-color:gray; */
`;



export {ContainerRelated, Category, Name, Price, ImageContainer, LeftArrow, RightArrow, CarouselContainer};


