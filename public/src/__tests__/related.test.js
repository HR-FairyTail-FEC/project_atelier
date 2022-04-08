import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Related from '../Related.jsx';
// import {isTSAnyKeyword} from '@babel/types';

/**
 * @jest-environment jsdom
 */

it ('renders <Related> without crashing', ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<Related> </Related>, div);
})

test()

