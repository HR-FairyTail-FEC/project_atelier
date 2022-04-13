import React from 'react';
import styled from "styled-components";
// import {Checkmark} from '@styled-icons/fluentui-system-filled/Checkmark';

const ModalTitle = styled.div`
  /* border-style:solid; */
  text-align:center;
`;

const ComparingModal = styled.div`
  border-style:solid;
  height: 100%;
  position: relative;
`;

const TitleContainer = styled.div`
  height: 30px;
`;

const TitleMain = styled.p`
  width:50%;
  float:left;
  /* border-style:dotted; */
  /* text-align:left; */
`;

const TitleRelated = styled.p`
  width:50%;
  /* border-style:dotted; */
  float: right;
  text-align:right;
`;

const Features = styled.div`
  height: 100%;
  /* border-style:dotted; */
`;

const Feature = styled.div`
  width:100%;
  /* border-style:dotted; */
  text-align: center;
`;
// const CheckmarkRed = styled(Checkmark)`
//   color: red;
//   stroke-width: 2;
//   height:16px;
//   width:16px;
//   float: ${props=>props.side};
// `;

export {ModalTitle, ComparingModal, TitleContainer,  TitleMain, TitleRelated, Features, Feature }; //took out checkmarkred