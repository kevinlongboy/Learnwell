/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// local files
import * as sessionActions from "../../store/sessionReducer";
import CTASection from './CTASection';
import FeaturesSection from './FeaturesSection';
import { thunkReadAllVideos } from "../../store/videosReducer";
import { LandingContainer } from '../../styled-components/feature-specific';


/******************************* COMPONENT *******************************/
function Landing({ userState }) {

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sessionActions.restoreUser());
    }, [])

    useEffect(() => {
        dispatch(thunkReadAllVideos());
    }, [dispatch])
    
    /************ render component ************/
    if (userState && userState.id) {
        return (<Redirect to="/videos"></Redirect>)
    } else {
        return (
            <LandingContainer>
                <CTASection />
                <FeaturesSection />
            </LandingContainer>
        )
    }
};


/******************************** EXPORTS ********************************/
export default Landing;