/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
// local files
import agreedGif from "../../assets/landing-graphics/agreed.gif";
import goodPointGif from "../../assets/landing-graphics/good-point.gif";
import submit from "../../assets/landing-graphics/submit.gif";
import {FeaturesSectionContainer } from '../../styled-components/feature-specific';
import { H1Marketing } from '../../styled-components/text';


/******************************* COMPONENT *******************************/
function FeaturesSection() {

    return (
        <FeaturesSectionContainer>

            <div>
                <img src={agreedGif} style={{height:"85%"}}></img>
            </div>

            <div>
                <img src={goodPointGif} style={{height:"60%"}}></img>
            </div>

            <div>
                <H1Marketing>Get into heated debates</H1Marketing>
                <H1Marketing>🔥🔥🔥</H1Marketing>
                <img src={submit} style={{height:"40%", cursor:"pointer"}}></img>
            </div>

        </FeaturesSectionContainer>
    )
};


/******************************** EXPORTS ********************************/
export default FeaturesSection;