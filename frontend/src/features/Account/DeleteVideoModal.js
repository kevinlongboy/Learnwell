/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// local files
import closeIcon from "../../assets/icons/x-icon.svg";
import { thunkDeleteSingleVideo } from "../../store/videosReducer";
import { RightWrapper, Wrapper } from "../../styled-components/containers";
import { H0Marketing, H2Marketing } from "../../styled-components/text";
import { ModalContainer } from "../../styled-components/feature-specific";
import { BlankButtonMS, FilledButtonMS } from "../../styled-components/buttons";


/******************************* COMPONENT *******************************/
function DeleteVideoModal({ setShowModal, setModalContent, videoDetails }) {
   
    /************ reducer/API communication ************/
    const history = useHistory();
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const videoId = videoDetails.id;

    /****************** handle events *******************/
    const submitDelete = async (e) => {

        const videoDeleted = await dispatch(thunkDeleteSingleVideo(videoId)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    data.errors.forEach(message =>console.log("Database error: ", message));
                };
            }
        )

        if (videoDeleted) {
            setModalContent("updateVideo")
            setShowModal(false);
            window.scrollTo(0,0);
            history.push(`/account`);
        }
    };

  /**************** render component *****************/
  return (
    <>
        <RightWrapper><img src={closeIcon} onClick={(e) => {setModalContent("updateVideo"); setShowModal(false);}}></img></RightWrapper>

        <ModalContainer>
            <H0Marketing>End Discussion</H0Marketing>
            <Wrapper style={{width:"450px", height:"300px"}}>
                <H2Marketing>Are you sure you want to</H2Marketing>
                <H2Marketing>delete this video?</H2Marketing>
            </Wrapper>
        </ModalContainer>


        <Wrapper direction="row">
            <BlankButtonMS onClick={() => setModalContent("updateVideo")}>Back to Edit</BlankButtonMS>
            <FilledButtonMS onClick={submitDelete} style={{margin:"5px"}}>Confirm Delete</FilledButtonMS>
        </Wrapper>

    </>
  );
}


/******************************** EXPORTS ********************************/
export default DeleteVideoModal;
