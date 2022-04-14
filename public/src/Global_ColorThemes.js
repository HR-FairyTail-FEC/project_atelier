import {createGlobalStyle} from 'styled-components';

export const lightTheme = {
  body:"0000FF",
  text:"#000000",
};

export const darkTheme = {
  body: "#121212",
  text:"#FFFFFF",
};

export const GlobalStyles = createGlobalStyle`
  body{
    background-color: ${(props)=>props.theme.body};
    color: ${(props)=>props.theme.text};
  }
`;
