/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// local files
import SubSectionMenu from '../../reusable-components/SubSectionMenu';
import VideoQueue from '../../reusable-components/VideoQueue';
import { thunkReadAllVideos } from '../../store/videosReducer';
import { ComponentContainer, FullPageContainer, LeftWrapper } from '../../styled-components/containers';
import { H0Marketing } from '../../styled-components/text';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


/******************************* COMPONENT *******************************/
function AllVideos({userState}) {
    
    /****************** access store *******************/
    const videosState = useSelector(state => state.videos.allVideos);
    
    /************ reducer/API communication ************/
    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkReadAllVideos());
    }, [dispatch, userState]);
    
    /************ key into pertinent values ************/
    let newVideosArray = videosState === null ? [] : Object.values(videosState).reverse().slice(0,6)    
    let topVideosArray = videosState === null ? [] : getTopVideos(videosState)

    function getTopVideos(object) {
        if (videosState !== null) {
            let videos = Object.values(videosState);
            
            let sortable = [];
            videos.forEach(vid => sortable.push([vid, vid.numComments])); // returns [[{video}, numComments], [{video}, numComments], ...]
            
            let sorted = sortable.sort(function(a, b) { // sorts video by numComments, ascending
                return a[1] - b[1];
            });
            let topVideos = sorted.reverse().slice(0,6); // sorts video by numComments, descending, then returns top 6 most commented videos
            
            let topVideosArray = topVideos.map(subArr => subArr[0]); // flattens 2D array by removing numComments and returns just the video-objects
            return topVideosArray;
        };
    }

    // to get list of available subjects from all videos
    // which will be passed to Subjects Menu
    let videos = videosState === undefined ? [] : Object.values(videosState)
    let subjectIds = [];
    let subjects = [];
    if (videos.length) {
        videos.forEach(video => {
            if (!subjectIds.includes(video.subjectId)) {
                subjectIds.push(video.subjectId);
                subjects.push(video.Subject);
            };
        });
    };

    // sort subjects alphabetically
    function alphabetizeSubjects(array) {
        let sortable = [];
        array.forEach(vid => sortable.push([vid, vid.name]));
        
        let sorted = sortable.sort();
        
        let sortedArray = sorted.map(subArr => subArr[0]); 
        return sortedArray;
    };
    if (subjects.length) subjects = alphabetizeSubjects(subjects);
    
    // modify subject-objects in subjects array, by adding the following callback function
    function toSubject(subjectId) {
        window.scrollTo(0,0);
        history.push(`/subjects/${subjectId}`)
    };
    if (subjects.length) {
        subjects.forEach(item => item.func = toSubject)
        subjects.unshift({id: 0, name: "All Videos", avatar: "All Videos", func: () => history.push('/videos') }) // add "All Videos" as am option to the menu items list
    };

    /************ render component ************/
    if (userState && userState.id == null) return <Redirect to="/"></Redirect>;

    return (
        <FullPageContainer>
            <ComponentContainer display="row">

                <SubSectionMenu menuType={"subjects"} menuTitle={"CATALOG"} menuItems={subjects} />

                {videosState && (
                    <LeftWrapper>
                        <H0Marketing>All Discussions</H0Marketing>                        
                        <VideoQueue type="read" title={"New ✨"} state={newVideosArray} />
                        <VideoQueue type="read" title={"Top 🥇"} state={topVideosArray} />
                    </LeftWrapper>
                )}                

                </ComponentContainer>
        </FullPageContainer>
    );
};

/******************************** EXPORTS ********************************/
export default AllVideos;