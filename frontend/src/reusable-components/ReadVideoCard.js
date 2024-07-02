/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
import ReactPlayer from 'react-player'
import { NavLink } from 'react-router-dom';
// local files
import { ReadVideoCardContainer } from '../styled-components/feature-specific';
import { Wrapper } from '../styled-components/containers';
import { H3Information, H4Information, H4Link } from '../styled-components/text';


/******************************* COMPONENT *******************************/
function ReadVideoCard({object}) {
    
    // console.log("ReadVideoCard object", object)

    return (
        <NavLink exact to={`/videos/${object.id}`}>
            <ReadVideoCardContainer>
                <Wrapper><ReactPlayer url={object.url} width='100%' height='187.5px' controls='true'/></Wrapper>
                <H3Information>{object.title}</H3Information>
                <H4Information>Started by {object.User.firstName}</H4Information>
                <NavLink exact to={`/subjects/${object.subjectId}`}><H4Link>{object.Subject.name}</H4Link></NavLink>
            </ReadVideoCardContainer>
        </NavLink>
    );
};


/******************************** EXPORTS ********************************/
export default ReadVideoCard;