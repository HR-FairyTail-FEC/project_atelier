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

const Stars = styled.p`
  font-weight: 300;
  position: absolute;
  bottom: 65px;
  left: 10px;

`;


export {ContainerRelated, Category, Name, Price, Stars, ImageContainer};


