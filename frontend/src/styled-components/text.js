import styled from 'styled-components';
import { palette } from "./branding";


/******************************** REGULAR TEXT ********************************/
export const H0Marketing = styled.text`
padding: 10px;
font-size: 72px;
font-weight: 600;
color: ${palette.core_5};
text-transform: uppercase;
-webkit-text-stroke-width: 4px;
-webkit-text-stroke-color: white;
text-shadow: 3px 3px 0px ${palette.secondary_1};

// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;
`;

export const H1Marketing = styled.text`
padding: 10px;
font-size: 48px;
font-weight: 600;
color: ${palette.accent_1};
`;

export const H2Marketing = styled.text`
padding: 10px;
font-size: 32px;
font-weight: 600;
color: ${palette.core_1};
`;

export const H2Information = styled.text`
padding: 5px 10px;
font-size: 32px;
color: ${palette.core_1};
`;

export const H3Information = styled.text`
padding: 10px;
font-size: 24px;
color: ${palette.core_1};
`;

export const H4Information = styled.text`
padding: 3px 10px;
font-size: 18px;
color: ${palette.core_1};
`;

export const P1Information = styled.text`
padding: 10px;
font-size: 16px;
color: ${palette.core_1};
`;


/******************************** HYPERLINKS ********************************/
export const H2Link = styled.nav`
padding: 5px 10px;
font-size: 32px;
color: ${palette.secondary_1};
cursor: pointer;

    &:hover {
        color: ${palette.core_1};
    }

    &:active {
        color: ${palette.accent_1};
        // -webkit-text-stroke-width: 2px;
        // -webkit-text-stroke-color: white;
    }
}`

export const H4Link = styled.nav`
padding: 3px 10px;
font-size: 18px;
color: ${palette.secondary_1};
cursor: pointer;

    &:hover {
        color: ${palette.core_1};
    }

    &:active {
        color: ${palette.accent_1};
        // -webkit-text-stroke-width: 1px;
        // -webkit-text-stroke-color: white;
    }
}`


/******************************** ERRORS ********************************/
export const ErrorsList = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

margin: 10px;

li {
    margin:0;
    padding:0;

    font-size: 16px;
    color: #FF0000;
    list-style-position:inside;
    list-style-type: none;
};
`
