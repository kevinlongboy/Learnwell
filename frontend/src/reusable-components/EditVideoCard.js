/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
import ReactPlayer from 'react-player'
import { NavLink } from 'react-router-dom';
// local files
import { EditVideoCardContainer } from '../styled-components/feature-specific';
import { Wrapper } from '../styled-components/containers';
import { H3Information, H4Information, H4Link } from '../styled-components/text';


/******************************* COMPONENT *******************************/
function EditVideoCard({object}) {
    
    return (
        <EditVideoCardContainer onClick={() => {object.func(true); object.func2(object)}}>
            <Wrapper><ReactPlayer url={object.url} width='100%' height='187.5px' controls='true'/></Wrapper>
            <H3Information>{object.title}</H3Information>
            <H4Information>Uploaded on {object.createdAt}</H4Information>
            <NavLink exact to={`/subjects/${object.subjectId}`}><H4Link>{object.Subject.name}</H4Link></NavLink>
        </EditVideoCardContainer>
    );
};


/******************************** EXPORTS ********************************/
export default EditVideoCard;

/******************************** EXPORTS ********************************/
// Line 16: open edit video modal when card is clicked