/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from 'react';
// local files
import { FooterContainer, FooterWrapper } from '../../styled-components/feature-specific';
import { LeftWrapper, RightWrapper, Wrapper } from '../../styled-components/containers';
import { P1Information } from '../../styled-components/text';
import cranebnbLogoInactive from "../../assets/social-media-branding/cranebnb-logo-black.png"
import githubLogoInactive from "../../assets/social-media-branding/github-logo-black.png"
import kevinelleLogoInactive from "../../assets/social-media-branding/kevinelle-logo-black.png"
import linkedInLogoInactive from "../../assets/social-media-branding/linkedIn-logo-black.png"
import marketLogoInactive from "../../assets/social-media-branding/market-logo-black.png"
import cranebnbLogoActive from "../../assets/social-media-branding/cranebnb-logo-white.png"
import githubLogoActive from "../../assets/social-media-branding/github-logo-white.svg"
import kevinelleLogoActive from "../../assets/social-media-branding/kevinelle-logo-white.png"
import linkedInLogoActive from "../../assets/social-media-branding/linkedIn-logo-white.png"
import marketLogoActive from "../../assets/social-media-branding/market-logo-white.png"


/******************************* COMPONENT *******************************/
function Footer() {

    const [portfolioActive, setPortfolioActive] = useState(false);
    const [linkedInActive, setLinkedInActive] = useState(false);
    const [githubActive, setGithubActive] = useState(false);
    const [marketActive, setMarketActive] = useState(false);
    const [cranebnbActive, setCranebnbActive] = useState(false);

    const links = [
        {name: "About", url: "https://www.scopelabs.com/about"},
        {name: "Work", url: "https://www.scopelabs.com/work"},
        {name: "Contact", url: "HELLO@SCOPELABS.COM"},
    ]

    const socialMedia = [
        {
            name: "Portfolio", 
            url: "http://kevinlongboy.com", 
            status: portfolioActive,
            setStatus: setPortfolioActive,
            inactive: kevinelleLogoInactive, 
            active: kevinelleLogoActive
        },
        {
            name: "LinkedIn", 
            url: "https://www.linkedin.com/in/kevinlongboy/", 
            status: linkedInActive,
            setStatus: setLinkedInActive,
            inactive: linkedInLogoInactive, 
            active: linkedInLogoActive
        },
        {
            name: "GitHub", 
            url: "https://github.com/kevinlongboy/Learnwell", 
            status: githubActive,
            setStatus: setGithubActive,
            inactive: githubLogoInactive, 
            active: githubLogoActive
        },
        {
            name: "Market", 
            url: "https://kl-market.herokuapp.com", 
            status: marketActive,
            setStatus: setMarketActive,
            inactive: marketLogoInactive, 
            active: marketLogoActive
        },
        {
            name: "CraneBnB", 
            url: "https://kl-airbnb.herokuapp.com", 
            status: cranebnbActive,
            setStatus: setCranebnbActive,
            inactive: cranebnbLogoInactive, 
            active: cranebnbLogoActive
        },
    ]

  /**************** render component *****************/
  return (
    <FooterContainer>
      <FooterWrapper>

        <Wrapper direction="row">
            {links.map(link => (
                <LeftWrapper><a href={link.url} target='_blank' style={{color:"#fff"}} key={link.name}>{link.name}</a></LeftWrapper>
            ))}
        </Wrapper>
        
        <Wrapper direction="row">
            <LeftWrapper><P1Information style={{color:"#fff"}}>© Learnwell, Inc. 2024</P1Information></LeftWrapper>
            
            <RightWrapper style={{paddingRight:"20px"}}>
                {socialMedia.map(link => (
                    <a 
                        key={link.name} 
                        href={link.url} 
                        target='_blank' 
                        onMouseEnter={(e) => link.setStatus(true)}
                        onMouseLeave={(e) => link.setStatus(false)}
                    >
                        <img src={ link.status === true ?  link.active : link.inactive }></img>
                    </a>
                ))}
            </RightWrapper>
        </Wrapper>

      </FooterWrapper>
    </FooterContainer>
  );
};


/******************************** EXPORTS ********************************/
export default Footer;