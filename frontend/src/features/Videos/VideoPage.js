/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
// local files
import CommentsSection from '../Comments/CommentsSection';
import { thunkReadSingleVideoComments, thunkReadSingleVideoDetails } from '../../store/videosReducer';
import { ComponentContainer, FullPageContainer, LeftWrapper } from '../../styled-components/containers';
import { H0Marketing, H2Information, H2Link, H3Information } from '../../styled-components/text';


/******************************* COMPONENT *******************************/
function VideoPage({userState}) {

    /****************** access store *******************/
    const videosState = useSelector(state => state.videos);

    /************ key into pertinent values ************/
    const { videoId } = useParams();
    const video = videosState.singleVideoDetails;
    const comments = videosState.singleVideoComments;

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadSingleVideoDetails(videoId));
        dispatch(thunkReadSingleVideoComments(videoId));
    }, [dispatch])

    /************ render component ************/
    if (userState && userState.id == null) return <Redirect to="/"></Redirect>;

    return (
        <FullPageContainer>
            <ComponentContainer>

                <ReactPlayer url={video.url} width='100%' height='600px' controls='true' loop="true"/>

                <LeftWrapper><H0Marketing>{video.title}</H0Marketing></LeftWrapper>
                <LeftWrapper><H2Information>Started by {video.User.firstName}</H2Information></LeftWrapper>
                <LeftWrapper><H2Information>{video.createdAt}</H2Information></LeftWrapper>
                <LeftWrapper><NavLink exact to={`/subjects/${video.subjectId}`}><H2Link>{video.Subject.name}</H2Link></NavLink></LeftWrapper>
                <LeftWrapper><H3Information>{video.description}</H3Information></LeftWrapper>

                <CommentsSection comments={Object.values(comments)} videoId={videoId} />

            </ComponentContainer>
        </FullPageContainer>
    );
};

/******************************** EXPORTS ********************************/
export default VideoPage;

