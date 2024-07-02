import styled from 'styled-components';
import { palette } from "./branding";


/******************************** TEXT ********************************/
export const TextInput = styled.input`
width: ${props => props.size === "large"? 661 : 330 }px;
height: 79px;
background: ${palette.core_5};

margin: ${props => props.size === "large"? "5px 0px;" : "10px 5px;"}
border: 3px solid ${palette.core_1};

font-size: 24px;
color: ${palette.core_1};
text-indent: 5px;

&::placeholder {
    color: ${palette.core_1};
}

&:focus {
    background-color: ${palette.core_1};
    color: ${palette.core_5};
}
`


/******************************** SELECT ********************************/
export const SelectInput = styled.select`
width: 672px;
height: 90px;
background: ${palette.core_5};

margin: 5px;
padding: 5px;
border: 3px solid ${palette.core_1};

font-size: 24px;
color: ${palette.core_1};

&::placeholder {
    color: ${palette.core_1};
}

&:focus {
    background-color: ${palette.core_1};
    color: ${palette.core_5};
}
`


/******************************** TEXTAREA ********************************/
export const TextareaInput = styled.textarea`
min-width: ${props => props.size === "large" ? "100%" : "665px"};
max-width: ${props => props.size === "large" ? "100%" : "665px"};;
min-height: 160px;
max-height: 160px;
background: ${palette.core_5};

margin: ${props => props.size === "large" ? "10px" : "5px 0px"};
border: 3px solid ${palette.core_1};
padding: ${props => props.size === "large" ? "5px 0px" : "24px 0px"}; 

font-size: 24px;
color: ${palette.core_1};
text-indent: 5px;

cursor: pointer;

&::placeholder {
    color: ${palette.core_1};
}

&:focus {
    background-color: ${palette.core_1};
    color: ${palette.core_5};
}
`