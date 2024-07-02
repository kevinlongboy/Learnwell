/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// local files
import logotype from "../../assets/branding/logotype/logotype.svg";
import logomark from "../../assets/branding/logomark/logomark.svg";
import Session from './Session';
import NoSession from './NoSession';
import { NavBarContainer, NavBarWrapper } from '../../styled-components/feature-specific';
import { LeftWrapper, RightWrapper } from '../../styled-components/containers';


/******************************* COMPONENT *******************************/
function Navigation({ isLoaded }){

  /****************** access store *******************/
  const sessionUser = useSelector(state => state.session.user);

  /************ key into pertinent values ************/
  let userId = sessionUser ? sessionUser.id : undefined;

  /****************** manage state *******************/
  let [desktop, setDesktop] = useState(true);
  let [padding, setPadding] = useState("0px");

  // change home button image according to screen size
  // large width = logotype, small width = logomark
  const resize = () => {
    if (window.innerWidth > 1500) {
      setDesktop(true)
      setPadding("0px")
    } else {
      setDesktop(false)
      setPadding("20px")
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resize)
  });

  /**************** render component *****************/
  return (
    <NavBarContainer filled={sessionUser}>
      <NavBarWrapper>
        
        <LeftWrapper style={{paddingLeft: padding}}>
          <NavLink exact to="/videos"><img src={desktop ? logotype : logomark}></img></NavLink>
        </LeftWrapper>
  

        <RightWrapper style={{paddingRight:"5px"}}>
          {userId ? <Session sessionUser={sessionUser} /> : <NoSession />}
        </RightWrapper>
          
      </NavBarWrapper>
    </NavBarContainer>
  );
};


/******************************** EXPORTS ********************************/
export default Navigation;

/******************************** NOTES ********************************/
// Line 46: use sessionUser to determine color of navigation bar:
// If user is logged in, color is black. If no user, bar is transparent and
// all pages redirect to Landing Page