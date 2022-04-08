import React from 'react';
import styled from "styled-components"
import {PlusSquare} from '@styled-icons/bootstrap/PlusSquare';
import {Close} from '@styled-icons/evaicons-solid/Close';

const ContainerOutfit = styled.div`
  border-style: solid;
  margin-left: 15px;
  margin-right: 15px;
  width: 250px;
  height: 370px;
  font-family: 'Lato', sans-serif;
  position: relative;
  background-color: white;

`;


const AddToOutfit_Text = styled.p`
  /* border-style:solid; */
  font-weight: bold;
  font-size:30px;
  position: absolute;
  top: 250px;
  left: 30px;
  height:60px;
  text-align:center;
`;

const AddToOutfit_Button = styled(PlusSquare)`
  width:50%;
  position: absolute;
  top:50px;
  left: 60px;
  :hover{
    background-color:red;
  }
`;

const ActionButtonX = styled(Close)`
  width:45px;
  position: absolute;
  top:3px;
  right:3px;
  z-index:10000;
`;



export {ContainerOutfit, AddToOutfit_Text, AddToOutfit_Button, ActionButtonX};
