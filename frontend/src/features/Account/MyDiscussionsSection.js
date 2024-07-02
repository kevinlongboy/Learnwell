/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// local files
import VideoQueue from '../../reusable-components/VideoQueue';
import { thunkReadAllUserVideos } from '../../store/videosReducer';
import { Modal } from '../../context/Modal';
import EditVideoModal from '../Videos/EditVideoModal';
import DeleteVideoModal from './DeleteVideoModal';


/******************************* COMPONENT *******************************/
function MyDiscussionsSection({title}) {
    
    /****************** access store *******************/
    const videosState = useSelector(state => state.videos.allUserVideos);

    /****************** manage state *******************/
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("updateVideo")
    const [editVideoDetails, setEditVideoDetails] = useState({})

    /************ reducer/API communication ************/
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkReadAllUserVideos());
    }, [dispatch]);

    // modify array of user videos by adding setShowModal as a value
    // this will allow each video card to open the editVideoModal
    // also add setEditVideoDetails() as a value. 
    // This function allows state to be changed by selecting which video object's details
    // is displayed in the editVideo Modal
    if (videosState.length > 0) videosState.forEach(vid =>  { vid.func = setShowModal; vid.func2 = setEditVideoDetails })

    // use state to toggle between modal content; 
    // will display either log in or sign up
    let content = modalContent === "updateVideo" ? 
        (<EditVideoModal setShowModal={setShowModal} setModalContent={setModalContent} videoDetails={editVideoDetails} />) :
        (<DeleteVideoModal setShowModal={setShowModal} setModalContent={setModalContent} videoDetails={editVideoDetails} />);
    
    
    /************ render component ************/
    return (
        <>
            {videosState && (
                <VideoQueue type="edit" title={title} state={videosState}/> 
            )}

            {showModal && (
                <Modal onClose={() => setShowModal(false)}> 
                    {content}
                </Modal>
            )}
        </>
    );
};

/******************************** EXPORTS ********************************/
export default MyDiscussionsSection;