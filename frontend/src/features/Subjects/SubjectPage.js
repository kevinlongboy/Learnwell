/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom/cjs/react-router-dom.min';
// local files
import SubSectionMenu from '../../reusable-components/SubSectionMenu';
import VideoQueue from '../../reusable-components/VideoQueue';
import { thunkReadAllVideos } from '../../store/videosReducer';
import { ComponentContainer, FullPageContainer, LeftWrapper } from '../../styled-components/containers';
import { H0Marketing } from '../../styled-components/text';


/******************************* COMPONENT *******************************/
function SubjectPage({userState}) {
    
    /****************** access store *******************/
    const videosState = useSelector(state => state.videos.allVideos);
    
    /************ reducer/API communication ************/
    const history = useHistory();

    const { subjectId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadAllVideos());
    }, [dispatch]);
    
    /****************** manage state *******************/    
    let videos = videosState === undefined ? [] : Object.values(videosState)
    
    // to get list of available subjects from all videos
    // which will be passed to Subjects Menu
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
        history.push(`/subjects/${subjectId}`);
    };

    if (subjects.length) {
        subjects.forEach(item => item.func = toSubject)
        subjects.unshift({id: 0, name: "All Videos", avatar: "All Videos", func: () => history.push('/videos') }) // add "All Videos" as am option to the menu items list
    };

    // get array of videos corresponding to current subject
    let subjectVideos = []
    if (videos.length) {
        videos.forEach(video => {
            if (video.Subject.id === parseInt(subjectId)) {
                subjectVideos.push(video);
            };
        });
    };

    // Get subject
    // Modify title it's title to remove emoji
    let currSubject;
    if (subjectVideos.length) {
        currSubject = subjectVideos[0].Subject;
    }

    /************ render component ************/
    if (userState && userState.id == null) return <Redirect to="/"></Redirect>;
    
    return (
        <FullPageContainer>
                <ComponentContainer display="row">

                    {currSubject && (
                        <>
                            <SubSectionMenu menuType={"subjects"} menuTitle={"CATALOG"} menuItems={subjects} />
                            <LeftWrapper>
                                <H0Marketing>{currSubject.name.slice(0, currSubject.name.length - 2)}</H0Marketing>
                                <VideoQueue type="read" title={currSubject.avatar} state={subjectVideos} />
                            </LeftWrapper>
                        </>
                    )}

                </ComponentContainer>
        </FullPageContainer>
    );
};

/******************************** EXPORTS ********************************/
export default SubjectPage;