import styled from 'styled-components';
import { palette } from "./branding";


/******************************** FILLED BUTTONS ********************************/
export const FilledButtonMS = styled.button`
padding: 20px;  
background-color: ${palette.secondary_1};
border: 3px solid ${palette.secondary_1};
border-radius: 4px;
font-size: 18px;
color: ${palette.core_1};
cursor: pointer;

&:hover {
background-color: transparent;
border: 3px solid transparent;
color: ${palette.secondary_1};
};

&:active {
background-color: transparent;
border: 3px solid ${palette.secondary_1};
color: ${palette.core_1};
};

&:disabled {
background-color: ${palette.secondary_2};
border: 3px solid ${palette.secondary_2};
color: ${palette.core_1};
};
`;

export const FilledButtonMA = styled.button`
padding: 20px;  
background-color: ${palette.accent_1};
border: 3px solid ${palette.accent_1};
border-radius: 4px;
font-size: 18px;
color: ${palette.core_1};
cursor: pointer;

&:hover {
background-color: transparent;
border: 3px solid transparent;
color: ${palette.accent_1};
};

&:active {
background-color: transparent;
border: 3px solid ${palette.accent_1};
color: ${palette.core_1};
};

&:disabled {
background-color: ${palette.accent_2};
border: 3px solid ${palette.accent_2};
color: ${palette.core_1};
};
`;

export const FilledButtonSA = styled.button`
padding: 15px;  
background-color: ${palette.accent_1};
border: 2px solid ${palette.accent_1};
border-radius: 4px;
font-size: 16px;
color: ${palette.core_1};
cursor: pointer;

&:hover {
background-color: transparent;
border: 2px solid transparent;
color: ${palette.accent_1};
};

&:active {
background-color: transparent;
border: 2px solid ${palette.accent_1};
color: ${palette.core_1};
};

&:disabled {
background-color: ${palette.accent_2};
border: 2px solid ${palette.accent_2};
color: ${palette.core_1};
};
`;


/******************************** BLANK BUTTONS ********************************/
export const BlankButtonMS = styled.button`
padding: 20px;  
background-color: transparent;
border: 3px solid transparent;
border-radius: 4px;
font-size: 18px;
color: ${palette.core_1};
cursor: pointer;

&:hover {
background-color: ${palette.secondary_1};
border: 3px solid ${palette.secondary_1};
color: ${palette.core_1};
};

&:active {
background-color: transparent;
border: 3px solid ${palette.secondary_1};
color: ${palette.secondary_1};
};

&:disabled {
background-color: transparent;
border: 3px solid transparent;
color: ${palette.core_3};
};
`;

export const BlankButtonMA = styled.button`
padding: 20px;  
background-color: transparent;
border: 3px solid transparent;
border-radius: 4px;
font-size: 18px;
color: ${palette.core_1};
cursor: pointer;

&:hover {
background-color: ${palette.accent_1};
border: 3px solid ${palette.accent_1};
color: ${palette.core_1};
};

&:active {
background-color: transparent;
border: 3px solid ${palette.accent_1};
color: ${palette.accent_1};
};

&:disabled {
background-color: transparent;
border: 3px solid transparent;
color: ${palette.core_3};
};
`;

export const BlankButtonSA = styled.button`
padding: 15px;  
background-color: transparent;
border: 2px solid transparent;
border-radius: 4px;
font-size: 16px;
color: ${palette.core_1};
cursor: pointer;

&:hover {
background-color: ${palette.accent_1};
border: 2px solid ${palette.accent_1};
color: ${palette.core_1};
};

&:active {
background-color: transparent;
border: 2px solid ${palette.accent_1};
color: ${palette.accent_1};
};

&:disabled {
background-color: transparent;
border: 2px solid transparent;
color: ${palette.core_3};
};
`;


/******************************** MODAL BUTTONS ********************************/
export const ModalButtonFilled = styled.button`
width: 661px;
height: 62px;
background-color: ${palette.primary_1};

margin: 10px;
border: 3px solid ${palette.primary_1};
border-radius: 4px;
padding: 20px;  

font-size: 18px;
color: ${palette.core_1};
cursor: pointer;

&:hover {
    background-color: transparent;
    border: 3px solid transparent;
    color: ${palette.primary_1};
};

&:active {
    background-color: transparent;
    border: 3px solid ${palette.primary_1};
    color: ${palette.core_1};
};

&:disabled {
    background-color: ${palette.secondary_2};
    border: 3px solid ${palette.secondary_2};
    color: ${palette.core_1};
};
`;

export const ModalButtonBlank = styled.button`
width: 661px;
height: 62px;
background-color: transparent;

margin: 10px;
border: 3px solid transparent;
border-radius: 4px;
padding: 20px;  

font-size: 18px;
color: ${palette.core_1};
cursor: pointer;

&:hover {
    background-color: transparent;
    border: 3px solid transparent;
    color: ${palette.primary_1};
};

&:active {
    background-color: transparent;
    border: 3px solid ${palette.primary_1};
    color: ${palette.core_1};
};

&:disabled {
    background-color: transparent;
    border: 3px solid transparent;
    color: ${palette.core_3};
};
`;

export const ModalButtonOutline = styled.button`
width: 661px;
height: 62px;
background-color: transparent;

margin: 10px;
border: 3px solid ${palette.primary_1};
border-radius: 4px;
padding: 20px;  

font-size: 18px;
color: ${palette.primary_1};
cursor: pointer;

&:hover {
    background-color: ${palette.primary_1};
    border: 3px solid ${palette.primary_1};
    color: ${palette.core_1};
};

&:active {
    background-color: transparent;
    border: 3px solid transparent;
    color: ${palette.primary_1};
};

&:disabled {
    background-color: transparent;
    border: 3px solid ${palette.core_3};
    color: ${palette.core_3};
};
`;


/******************************** ICONS ********************************/
export const Icon = styled.div`
// width: 40px;
// fill: transparent;
// pointer: cursor;

// &:hover {
//     fill: ${palette.secondary_1};
// }

// `