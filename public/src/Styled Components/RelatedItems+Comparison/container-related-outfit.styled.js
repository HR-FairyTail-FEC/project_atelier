import React from 'react';
import styled from "styled-components"

const RelatedTitle = styled.div`
  color:black;
  height:30px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 20px;
  position: absolute;
  left: 70px;
  /* margin-bottom:10px; */
`;

const OutfitTitle = styled.div`
  color:black;
  height:30px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size:20px;
  position: absolute;
  top:10px;
  left: 70px;
  margin-top:10px;
`;

const SpaceHolderColumn = styled.div`
  height: 370px;
  width:100px;
  /* border: 5px solid black; */
  /* background-color: black; */
`;



export {RelatedTitle, OutfitTitle, SpaceHolderColumn};

