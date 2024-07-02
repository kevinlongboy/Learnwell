/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
import { profilePictures } from '../../component-resources';
import CreateComment from './CreateComment';
import { LeftWrapper, SectionContainer, Wrapper } from '../../styled-components/containers';
import { H1Marketing, H4Information, P1Information } from '../../styled-components/text';
import { CommentContainer } from '../../styled-components/feature-specific';
import { ProfilePicture } from '../../styled-components/branding';


/******************************* COMPONENT *******************************/
function CommentsSection({comments, videoId}) {    
    
    // Add profile pic to every comment
    // to be rendered in comment section 
    // key = "avatar", value = location
    comments.forEach(obj => {
        let profilePicture = profilePictures.find(pic => pic.name === obj.User.avatar).url;
        obj.avatar = profilePicture;
    });

    /************ render component ************/
    return (
        <SectionContainer>

            <LeftWrapper><H1Marketing>Comments 💬</H1Marketing></LeftWrapper>

                {comments.map((comment) => (
                    <CommentContainer>
                        <Wrapper width="fit-content">
                            <ProfilePicture size="small"><img src={comment.avatar}></img></ProfilePicture>
                            <P1Information>{comment.User.firstName}</P1Information>
                        </Wrapper>

                        <LeftWrapper>
                            <LeftWrapper><H4Information>{comment.comment}</H4Information></LeftWrapper>
                            <LeftWrapper><P1Information>{comment.createdAt}</P1Information></LeftWrapper>
                        </LeftWrapper>
                    </CommentContainer>
                ))}

                <Wrapper>
                    <CreateComment videoId={videoId}/>
                </Wrapper>

        </SectionContainer>
    );
};

/******************************** EXPORTS ********************************/
export default CommentsSection;

/******************************** NOTES ********************************/
// Use below code block to make comments more verbose
// import { LoremIpsum } from "lorem-ipsum";
// const lorem = new LoremIpsum({
//     sentencesPerParagraph: {
//         min: 3,
//         max: 5,
//     },
//     wordsPerSentence: {
//         min: 5,
//         max: 7,
//     }
// });
// obj.comment = obj.comment.concat(lorem.generateSentences(4));