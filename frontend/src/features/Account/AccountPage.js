/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from 'react';
// local files
import SubSectionMenu from '../../reusable-components/SubSectionMenu';
import { accountItems } from '../../component-resources';
import SettingsSection from './ProfileSection';
import { ComponentContainer, FullPageContainer, LeftWrapper } from '../../styled-components/containers';
import { H0Marketing } from '../../styled-components/text';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import MyDiscussionsSection from './MyDiscussionsSection';


/******************************* COMPONENT *******************************/
function AccountPage({userState}) {

    /****************** manage state *******************/
    const [setting, setSetting] = useState(1);

    /************ key into pertinent values ************/
    // modify accountItems
    // remove logout-item
    // add callback functions to remaining items
    // use this callback function to change state, 
    // which will allow control of which section appears in account (EG: "My Discussions" or "Settings")
    let accountMenuItems = accountItems.slice(0, accountItems.length - 1)
    accountMenuItems.forEach(item => item.func = setSetting)

    let pageContent = (setting === 1) ? 
        <MyDiscussionsSection title={accountMenuItems[setting - 1].name} /> : <SettingsSection title={accountMenuItems[setting - 1].name} state={userState}/>


    /************ render component ************/
    if (userState && userState.id == null) return <Redirect to="/"></Redirect>;

    return (
        <FullPageContainer>
            <ComponentContainer display="row">
                <SubSectionMenu menuType={"account"} menuTitle={"SETTINGS"} menuItems={accountMenuItems} />
                    
                    <LeftWrapper>
                        <H0Marketing>Account</H0Marketing>
                        {pageContent}                                                
                    </LeftWrapper>

            </ComponentContainer>
        </FullPageContainer>
    );
};

/******************************** EXPORTS ********************************/
export default AccountPage;


/********************************* NOTES *********************************/
// Subject is selected using SubSectionMenu component
// use this selection to change the videos cards