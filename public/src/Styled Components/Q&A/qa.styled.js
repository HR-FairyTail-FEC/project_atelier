import React from 'react';
import styled from "styled-components";
import { Search } from '@styled-icons/bootstrap/Search';

const QAContainer = styled.div`
  /* border: 1px solid black; */
  width: 90%;
  text-align: center;
  margin-top: 60px;
  margin-right: 38px;
  height: 600px;
  position: relative;
  top: 30px;
  font-family: 'Lato', sans-serif;
`;
const QATitle = styled.div`
  width: 100%;
  height: 40px;
  top: 10px;
  font-size: 20px;
  font-family: 'Lato', sans-serif;
  position: absolute;
  text-align: left;
`;
const QASearchBar = styled.div`
  width: 100%;
  height: 70px;
  font-family: 'Lato', sans-serif;
  position: absolute;
  top: 40px;
  text-align:center;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  flex: 1,
  flexDirection: 'row';
  justifyContent: 'center';
  alignItems: 'center';
  & input {
    width: 95%;
    height: 60px;
    font-size: 25px;
    box-shadow: 5px 5px 5px #D3D3D3;

  }
`;

const QAList = styled.div`
  width:100%;
  height: 450px;
  text-align: center;
  position: absolute;
  top:150px;
  display:flex;
  flex-direction: column;
  overflow-y:scroll;
  box-shadow: 10px 10px 10px #D3D3D3;
  padding-left: 5px;

`;

const QAResult = styled.div`
  width:100%;
  position: relative;
  text-align: left;
  margin-bottom: 20px;
`;

const QAQuestionTop = styled.div`
  width:100%;
  height: 55px;
  position: relative;
`;

const QAQuestion = styled.p`
  position: absolute;
  word-wrap: break-word;
  font-family: 'Lato', sans-serif;
  width: 100%;
  height: 80%;
  font-size: 19px;
  font-weight: 800;
`;

const QAHelpfulQ = styled.div`
  position: absolute, left;

`;
const QAReportQ = styled.div`
  position: absolute, left;
`;

const QAaddA = styled.div`
  position: absolute, left;
`;

const QAQuestionDetails = styled.div`
  display: flex;
  width:100%;
  position: absolute;
  font-family: 'Lato', sans-serif;
  top: 25px;
  color: #696969;
  font-size: 14px;
`;

const QAAnswerList = styled.div`
  /* border: 5px solid black; */
  margin-top:-10px;
  width:100%;
  height: ${props => props.numAShown*'100px'};
  display:flex;
  flex-direction: column;
`;

const QAanswer = styled.div`
  /* border: 1px solid red; */
  /* background-color: red; */
  width:100%;
  font-family: 'Lato', sans-serif;
`;

const QAanswerBody = styled.p`
  width:100%;
  height: 30%;
  font-family: 'Lato', sans-serif;
  font-size: 19px;
  display: flex;
`;

const QAanswerBot = styled.div`
  width:100%;
  display: flex;
  font-family: 'Lato', sans-serif;
  bottom: 20px;
  color: #696969;
  font-size: 14px;
`;

const QAanswerInfo = styled.div`
  font-family: 'Lato', sans-serif;

`;

const QAReportA = styled.div`
  font-family: 'Lato', sans-serif;
`;

const QAHelpfulA = styled.div`
`;

const QALoadA = styled.div`
  font-family: 'Lato', sans-serif;
  padding-right: 50px;
`;


const ContainerBot = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: left;
  top: 640px;
  height:30px;
  width:100%;

`;
const QALoadQ = styled.button`
  font-size: 2em;
  font-family: 'Lato', sans-serif;
  padding: 0.25em 1em;
  border: 2px solid #D3D3D3;
  border-radius: 3px;
  background: white;


`;
const QAaddQ = styled.button`
  font-size: 2em;
  font-family: 'Lato', sans-serif;
  padding: 0.25em 1em;
  border: 2px solid #D3D3D3;
  border-radius: 3px;
  background: white;
`;

const QSearch = styled(Search)`
  color: black;
  stroke-width: 2;
  height:50px;
  width:50px;
  position: absolute, right;
  font-family: 'Lato', sans-serif;
  z-index: 8;
  padding-top: 8px;
  padding-left: 8px;
`;

const styledButton = styled.button`
  padding: 0;
  border: black;
  background: none;
`;






export {QAContainer, QATitle, QASearchBar, QAList, QAQuestionTop, QAQuestion, QAHelpfulQ, QAHelpfulA, QAReportQ, QAaddA, QAQuestionDetails, QAanswer, QAanswerBody, QAanswerBot, QAanswerInfo, QAReportA, QALoadA, QALoadQ, QAaddQ, QAResult, ContainerBot, QAAnswerList, QSearch, styledButton};


