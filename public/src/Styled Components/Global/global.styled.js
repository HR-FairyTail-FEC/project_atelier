import React from 'react';
import styled from "styled-components"
import {Moon} from '@styled-icons/bootstrap/Moon';
import {Sun} from '@styled-icons/bootstrap/Sun';

const MoonIcon = styled(Moon)`
  width:45px;
  height:45px;
  margin-right:90px;
  /* background-color:blue; */
  /* border:1px solid black; */
`;

const SunIcon = styled(Sun)`
  width:45px;
  height:45px;
  margin-right:90px;
  /* background-color:blue; */
  /* border:1px solid black; */
  color: white;
`;

export {MoonIcon, SunIcon};
