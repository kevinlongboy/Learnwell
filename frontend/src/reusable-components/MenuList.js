/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
// local files
import { MenuListContainer } from '../styled-components/feature-specific';
import { H3Information } from '../styled-components/text';


/******************************* COMPONENT *******************************/
function MenuList({menuType, menuItems}) {

    return (
        <MenuListContainer>
            {menuItems && menuItems.map((item) => (
                <li key={item.index} onClick={menuType === "userMenu" ? (e) => item.func(e) : () => item.func(item.id)}>
                        <H3Information>{item.name}</H3Information>
                </li>
            ))}
        </MenuListContainer>
    );
};


/******************************** EXPORTS ********************************/
export default MenuList;


/********************************* NOTES *********************************/
// Line 14: In order to make Menu reusable, include a ternary in OnClick event listener
// If list item is "Log Out", "logout"-function will be invoked, which will log user out
// Otherwise, "setItemSelected"-function will be invoked instead, which will
// set the Subject on the "Videos" page 