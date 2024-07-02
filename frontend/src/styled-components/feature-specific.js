import styled from 'styled-components';
import { palette } from "./branding"


/******************************** NAVIGATION ********************************/
export const LandingContainer = styled.div`
top: 0;
z-index: 2;
`

export const CTASectionContainer = styled.nav`
width: 100%;
height: 100%;
background-color: ${palette.core_5};

display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(4, 1fr);

> div {
    display: flex;
    justify-content: center;
}

> div:nth-child(1) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 2;
    align-items: flex-end;
}

> div:nth-child(2) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    background-color: ${palette.accent_1};
    align-items: flex-start;
}

> div:nth-child(3) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 2;
    align-items: flex-end;
}

> div:nth-child(4) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 2;
    background-color: ${palette.accent_1};

    // Unique styling for button
    > div > div:last-child > text {
    height: 30px;
    color: ${palette.secondary_1};
    cursor: pointer;
    }

    > div > div:last-child > text:hover {
    color: ${palette.core_1};
    }

    > div > div:last-child > text:active {
    color: ${palette.primary_1};
    // -webkit-text-stroke-width: 1px;
    // -webkit-text-stroke-color: ${palette.core_5};
    }
}

> div:nth-child(5) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 2;
    align-items: flex-start;
}

> div:nth-child(6) {
    grid-column: 2 / span 1;
    grid-row: 4 / span 1;
    background-color: ${palette.accent_1};
    align-items: flex-end;
}

> div:nth-child(7) {
    grid-column: 3 / span 1;
    grid-row: 3 / span 2;
    align-items: flex-start;
}
`

export const FeaturesSectionContainer = styled.div`
width: 100%;
height: 500px;
background-color: ${palette.core_5};

display: grid;
grid-template-columns: repeat(7, 1fr);
grid-template-rows: repeat(8, 1fr);

padding-bottom: 120px;

> div {
    display: flex;
    align-items: center
}

> div:nth-child(1) {
    grid-column: 2 / span 4;
    grid-row: 3 / span 2;
    justify-content: flex-start;
}

> div:nth-child(2) {
    grid-column: 5 / span 1;
    grid-row: 4 / span 2;
    justify-content: flex-end;
}

> div:nth-child(3) {
    grid-column: 3 / span 3;
    grid-row: 4 / span 3;
    flex-direction: column;
    justify-content: center;
}
`

/******************************** NAVIGATION ********************************/
export const NavBarContainer = styled.nav`
width: 100%;
height: 100%;

margin-bottom: 0px;
padding: 10px 0px;

position: sticky;
top: 0;
background-color: ${palette.core_5};
// background-color: ${props => props.filled ? palette.core_5 : "transparent"}; // uncomment to change color per event
z-index: 1;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const NavBarWrapper = styled.nav`
width: 100%;
max-width: 1400px;

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

// Manage size of home button
> div > a {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
}
> div > a > img {
    max-height: 70px;
}

// *Adds space between right-side buttons*
> div > button:first-of-type {
    margin: 0px 20px;
};
`


/******************************** MENUS ********************************/
export const UserMenuContainer = styled.div`
width: fit-contet;
position: fixed;
top: 90px;
right: inherit;
background-color: ${palette.core_5};

display: flex;
flex-direction: column;
justify-content: left;
align-items: left;

padding: 15px 0px;
box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;

// Unique styling:

// Centers profile picture
> div:nth-child(1) {
    align-self: center;
}

// Change color and positioning of menu items
> div:nth-child(2) > text {
    display: flex;
    flex-direction: row;
    color: ${palette.core_1}
}

> div:nth-child(2) > text > p {
    margin: 0px 0px 0px 10px;
    color: ${palette.primary_1}
}
}
`

export const SubSectionMenuContainer = styled.div`
width: fit-content;

position: sticky;
top: 650;
z-index: 0;

display: flex;
flex-direction: column;
justify-content: left;
align-items: flex-start;

margin-right: 30px;
`

export const MenuListContainer = styled.div`
min-width: 320px;
background-color: ${palette.core_5};

// ol {
// list-style: none;
// };

li {
    margin: 0px;
    padding: 5px 0px;

    cursor: pointer;
    list-style-position:inside;
    list-style-type: none;

    &:hover {
        background-color: ${palette.accent_1};
        color: ${palette.core_1};
    };
    &:active {
        background-color: transparent;
    };
    &:active > text {
        color: ${palette.accent_1};
    };
};
`


/******************************** MODAL ********************************/
export const ModalContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`


/******************************** VIDEOS ********************************/
export const VideoQueueContainer = styled.div`
width: 100%;

display: flex;
flex-direction: row;
flex-wrap: wrap;
// justify-content: space-between;

margin-bottom: 20px;

> a {
    text-decoration: none;
    }

cursor: pointer;
`

export const ReadVideoCardContainer = styled.a`
width: 320px;
height: 325px;
background-color: transparent;

display: flex;
flex-direction: column;

margin: 10px;
border: 4px solid transparent;
border-radius: 4px;

cursor: pointer;

> a {
    width: fit-content;
    text-decoration: none;
    }

> text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    }

&:hover {
    background-color: ${palette.accent_1};
    };

&:active {
    border: 4px solid ${palette.accent_1};
    background-color: transparent;
    };
`

export const EditVideoCardContainer = styled.a`
width: 320px;
height: 325px;
background-color: transparent;

display: flex;
flex-direction: column;

margin: 10px;
border: 4px solid transparent;
border-radius: 4px;

cursor: pointer;

> a {
    width: fit-content;
    text-decoration: none;
    }

> text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    }

&:hover {
    background-color: ${palette.accent_1};
    };

&:active {
    border: 4px solid ${palette.accent_1};
    background-color: transparent;
    };
`


/******************************** COMMENTS ********************************/
export const CommentContainer = styled.div`
width: 100%;
min-height: 150px;

margin: 10px 0px;

display: flex;
flex-direction: row;
justify-content: flex-start;

// style left-side of container (user profile)
> div:first-child {
    padding-right: 20px;
}

// style right-side of container (comment text)
div:nth-child(2) {
    display: flex;
    flex-direction: column;
    // padding-left: 20px;
}
`


/******************************** FOOTER ********************************/
export const FooterContainer = styled.div`
width: 100%;
height: fit-content;
background-color: ${palette.core_5};

padding-top: 50px;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

border-top: 3px solid ${palette.core_1};
`

export const FooterWrapper = styled.nav`
width: 100%;
max-width: 1400px;
height: 200px;

display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;


> div:first-child {
    height: 100%;
    padding-left: 30px;
    // border-bottom: 3px solid ${palette.core_5};
}
> div:nth-child(2) {
    height: 100%;
    padding-left: 10px;
}
> div:last-child > div:last-child > a {
    width: 30px;
    height: 30px;
    background-color: ${palette.core_1};
    
    margin-left: 5px;
    border-radius: 50%;
    
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:hover {
        background-color: ${palette.core_5};
    }
    &:active {
        background-color: ${palette.accent_1};
    }
}
> div:last-child > div:last-child > a > img {
    width: 15px;
}
`