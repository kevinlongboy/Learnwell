/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// local files
import closeIcon from "../../assets/icons/x-icon.svg";
import Errors from "../../reusable-components/Errors";
import { thunkReadAllSubjects } from "../../store/subjectsReducer";
import { thunkUpdateSingleVideo } from "../../store/videosReducer";
import { validateUrl } from "../../component-resources";
import { RightWrapper, Wrapper } from "../../styled-components/containers";
import { H0Marketing } from "../../styled-components/text";
import { ModalContainer } from "../../styled-components/feature-specific";
import { BlankButtonMS, FilledButtonMS } from "../../styled-components/buttons";
import { SelectInput, TextInput, TextareaInput } from "../../styled-components/inputs";


/******************************* COMPONENT *******************************/
function EditVideoModal({ setShowModal, setModalContent, videoDetails }) {

    /****************** access store *******************/
    const subjectsState = useSelector(state => state.subjects.allSubjects);
   
    /************ reducer/API communication ************/
    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkReadAllSubjects());
    }, [dispatch]);

    /****************** manage state *******************/
    let [subjectId, setSubjectId] = useState(videoDetails.subjectId);
    let [title, setTitle] = useState(videoDetails.title);
    let [description, setDescription] = useState(videoDetails.description);
    let [url, setUrl] = useState(videoDetails.url);
    let [errors, setErrors] = useState([]);
    
    /****************** key into pertinent values *******************/
    const textFields = [
        {
            type: "text",
            placeholder: "Title",
            value: title,
            required: true,
            manageState: setTitle,

        },
        {
            type: "text",
            placeholder: "URL",
            value: url,
            required: true,
            manageState: setUrl,
        },
    ];
    const selectFields = [
        {
            type: "select",
            placeholder: "Subject",
            value: subjectId,
            required: true,
            manageState: setSubjectId,
        },
    ];
    const textareaFields = [
        {
            type: "textarea",
            placeholder: "Description",
            value: description,
            required: true,
            manageState: setDescription,
        },
    ];
    

    /****************** handle events *******************/
    const submitUpdate = async (e) => {

        e.preventDefault();
        setErrors([]);
        let validationErrors = [];
        
        // convert field value, subject's name, to subject's id
        // to be passed to reducer & db
        let findSubject = subjectsState.find(subject => subject.name === subjectId);
        subjectId = (!findSubject) ? null : findSubject.id;

        // validate inputs
        if (!title) validationErrors.push(`Title is required`);
        if (!url) validationErrors.push(`URL is required`);
        if (validateUrl(url) === false) validationErrors.push(`Please enter a valid URL`);
        if (!subjectId) validationErrors.push(`Subject is required`);
        if (!description) validationErrors.push(`Description is required`)

        setErrors(validationErrors);
        if (validationErrors.length) return;

        let videoData = {
            subjectId: subjectId,
            title: title,
            description: description,
            url: url,
        };

        const updatedVideo = await dispatch(thunkUpdateSingleVideo(videoDetails.id, videoData)).catch(
            async (res) => {

                const data = await res.json();

                if (data && data.errors) {
                    data.errors.forEach(message => validationErrors.push(message));
                    setErrors(validationErrors);
                }
            }
        )

        if (updatedVideo) {
            setShowModal(false);
            window.scrollTo(0,0);
            history.push(`/videos/${updatedVideo.id}`);
        }
    };

  /**************** render component *****************/
  return (
    <>
        <RightWrapper><img src={closeIcon} onClick={(e) => setShowModal(false)}></img></RightWrapper>

        <H0Marketing>What I Meant To Say</H0Marketing>

        <ModalContainer>
        {
            textFields.map((field) => (
                <label>
                    <TextInput 
                        size={"large"}
                        key={field.placeholder}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        required={field.required}
                        onChange={(e) => field.manageState(e.target.value)}
                        >
                    </TextInput>
                </label>
            ))
        }
        {
            selectFields.map((field) => (
                <field>
                    <SelectInput
                        key={field.placeholder}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        required={field.required}
                        onChange={(e) => field.manageState(e.target.value)}
                        >
                            <option>Subject</option>
                            { subjectsState && Object.values(subjectsState).map((subject) => <option>{subject.name}</option>) }
                    </SelectInput>
                </field>
            ))
        }
        {
            textareaFields.map((field) => (
                <label>
                    <TextareaInput size={"medium"}
                        key={field.placeholder}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        required={field.required}
                        onChange={(e) => field.manageState(e.target.value)}
                        >
                    </TextareaInput>
                </label>
            ))
        }
        
        </ModalContainer>

        {errors && <Errors array={errors} />}

        <Wrapper direction="row">
            <FilledButtonMS onClick={submitUpdate} style={{margin:"5px"}}>Update</FilledButtonMS>
            <BlankButtonMS onClick={() => setModalContent("deleteVideo")} style={{margin:"5px"}}>Delete</BlankButtonMS>
        </Wrapper>

    </>
  );
}


/******************************** EXPORTS ********************************/
export default EditVideoModal;
