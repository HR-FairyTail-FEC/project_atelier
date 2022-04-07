import React from 'react';
import styled from "styled-components"

const ContainerOutfit = styled.div`
  border-style: solid;
  margin-left: 30px;
  margin-right: 30px;
  width: 250px;
  height: 370px;
  font-family: 'Lato', sans-serif;
  position: relative;
`;


const AddToOutfit_Text = styled.p`
  border-style:solid;
  font-weight: bold;
  font-size:30px;
  position: absolute;
  top: 250px;
  left: 30px;
  height:60px;
  text-align:center;
`;

const AddToOutfit_Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
`;



export {ContainerOutfit, AddToOutfit_Text, AddToOutfit_Button};
