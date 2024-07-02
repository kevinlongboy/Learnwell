/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// local files
import * as sessionActions from '../../../store/sessionReducer';
import MenuList from '../../../reusable-components/MenuList';
import { profilePictures, accountItems } from '../../../component-resources';
import { ProfilePicture } from '../../../styled-components/branding';
import { UserMenuContainer } from '../../../styled-components/feature-specific';
import { H1Marketing } from '../../../styled-components/text';
import { Wrapper } from '../../../styled-components/containers';


/******************************* COMPONENT *******************************/
function UserMenu({ sessionUser, handleMenu }) {

    /****************** manage state *******************/
    const [itemSelected, setItemSelected] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    const toAccount = (e) => {
        handleMenu(false);
        window.scrollTo(0,0);
        history.push(`/account`);
    }
    
    const logout = async (e) => {
        let confirmation = await dispatch(sessionActions.logout());
        if (confirmation) {
            window.scrollTo(0,0);
            history.push('/');
        };
    };

    // modify accountItems
    let modifiedAccountItems = accountItems.slice(accountItems.length - 1)
    // modify unique item specific to this menu
    modifiedAccountItems.unshift({id: 1, name: "Account"});
    // modify keys by adding callback function
    // to handle for onClick events
    modifiedAccountItems[0].func = toAccount;
    modifiedAccountItems[1].func = logout;

    let profilePicture = profilePictures.find(pic => pic.name === sessionUser.avatar).url;
    
    /**************** render component *****************/
    return (
        <UserMenuContainer>
            <ProfilePicture>
                <img src={profilePicture}></img>
            </ProfilePicture>
            <Wrapper><H1Marketing>Hello, <p>{sessionUser.firstName}</p></H1Marketing></Wrapper>
            <MenuList type={"userMenu"} menuItems={modifiedAccountItems}></MenuList>
        </UserMenuContainer>
    );
};

/******************************** EXPORTS ********************************/
export default UserMenu;

