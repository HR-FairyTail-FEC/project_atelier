import React from 'react';
import styled from "styled-components"

const QAContainer = styled.div`
  border-style: solid;
  width: 100%;
  height: 800px;
  position: relative;
  top: 800px
`;

const QATitle = styled.div`
  border-style: solid;
  width: 100%;
  height: 50px;
  font-family: 'Lato', sans-serif;
  position: absolute;
`;

const QASearchBar = styled.div`
  border-style: solid;
  width: 100%;
  height: 50px;
  font-family: 'Lato', sans-serif;
  position: absolute;
  top:50px;
`;

const QAList = styled.div`
  border-style:solid;
  width:100%;
  position: absolute;
  font-family: 'Lato', sans-serif;
  top:100px;
`;







export {QAContainer, QATitle, QASearchBar, QAList};


