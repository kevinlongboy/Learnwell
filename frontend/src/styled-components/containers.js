import styled from 'styled-components';
import { palette } from "./branding";


/******************************** CONTAINERS ********************************/
export const FullPageContainer = styled.div`
display: flex;
justify-content: center;

width: 100%;
min-height: 100vh;

margin-bottom: 0px;
padding: 30px 0px 200px;

background-color: ${palette.core_5};
`

export const ComponentContainer = styled.div`
display: flex;
flex-direction: ${props => props.display === "row" ? "row" : "column"};
justify-content: flex-start;
// align-items: center;

width: 100%;
max-width: 1400px;
height: 100%;

margin: 0px;
padding: 0px 20px;
`

export const SectionContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: left;
align-items: flex-start;

margin: 80px 0px 0px;
`


/******************************** WRAPPERS ********************************/
export const Wrapper = styled.div`
width: ${props => props.width === "fit-content" ? "fit-content" : "100%"};
display: flex;
flex-direction: ${props => props.direction === "row" ? "row" : "column"};
align-items: center;
justify-content: center;
`

export const LeftWrapper = styled.div`
width: ${props => props.width === "fit-content" ? "fit-content" : "100%"};
display: flex;
flex-direction: column;
justify-content: left;
align-items: flex-start;

> a {
    width: fit-content;
    text-decoration: none;
    }
`

export const RightWrapper = styled.div`
width: 100%;
display: flex;
justify-content: right;
align-items: center;
`