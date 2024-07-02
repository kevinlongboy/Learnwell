/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
// local files
import MenuList from './MenuList';
import { SubSectionMenuContainer } from '../styled-components/feature-specific';
import { H2Marketing } from '../styled-components/text';


/******************************* COMPONENT *******************************/
function SubSectionMenu({menuType, menuTitle, menuItems}) {
    
    /**************** render component *****************/
    return (
        <>
            {menuItems && (
                <SubSectionMenuContainer width="fit-content">
                    <H2Marketing>{menuTitle}</H2Marketing>
                    <MenuList menuType={menuType} menuItems={menuItems} />
                </SubSectionMenuContainer>
            )}
        </>
    );
};


/******************************** EXPORTS ********************************/
export default SubSectionMenu;

