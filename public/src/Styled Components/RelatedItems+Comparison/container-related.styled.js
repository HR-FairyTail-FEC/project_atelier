import React from 'react';
import styled from "styled-components"

const ContainerRelated = styled.div`
  border-style: solid;
  margin-left: 30px;
  margin-right: 30px;
  width: 250px;
  height: 370px;
  font-family: 'Lato', sans-serif;
  position: relative;
`;


console.log('access image container');
const ImageContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 150px;
  right:10px;
  border-style:solid;
  background-color:blue;
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
  bottom: 130px;
  left: 10px;
`;

const Name = styled.p`
  /* border-style:solid; */
  font-weight: bold;
  font-size:21px;
  position: absolute;
  top: 230px;
  left: 10px;
  height:60px;
`;

const Price = styled.p`
  font-weight: 300;
  position: absolute;
  font-weight: 300;
  bottom: 86px;
  left: 10px;
`;

const LeftArrowCol = styled.div`
  width:50px;
  border-style:solid;
  position: relative;

`;

const LeftArrowDiv = styled.div`
  border-style:dotted;
  color: blue;
  position: absolute;
  width:50px;
  height:50px;
  bottom: calc((100%/2));
`;

const LeftArrow=()=>{
  return (
    <LeftArrowCol>
      <LeftArrowDiv>
        <svg x="0px" y="0px" viewBox="0 0 512 512" >
          <path d="M168.837,256L388.418,36.418c8.331-8.331,8.331-21.839,0-30.17c-8.331-8.331-21.839-8.331-30.17,0L123.582,240.915 c-8.331,8.331-8.331,21.839,0,30.17l234.667,234.667c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17 L168.837,256z"/>
        </svg>
      </LeftArrowDiv>

    </LeftArrowCol>

  )
}


const RightArrowCol = styled.div`
  width:50px;
  border-style:solid;
  position: relative;

`;

const RightArrowDiv = styled.div`
  border-style:dotted;
  color: blue;
  position: absolute;
  width:50px;
  height:50px;
  bottom: calc((100%/2));
`;

const RightArrow=()=>{
  return (
    <RightArrowCol>
      <RightArrowDiv>
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
  background-color:blue;
`;



export {ContainerRelated, Category, Name, Price, ImageContainer, LeftArrow, RightArrow, CarouselContainer};


