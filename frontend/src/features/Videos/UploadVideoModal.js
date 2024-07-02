/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// local files
import closeIcon from "../../assets/icons/x-icon.svg";
import Errors from "../../reusable-components/Errors";
import { thunkReadAllSubjects } from "../../store/subjectsReducer";
import { thunkCreateSingleVideo } from "../../store/videosReducer";
import { validateUrl } from "../../component-resources";
import { RightWrapper, Wrapper } from "../../styled-components/containers";
import { H0Marketing } from "../../styled-components/text";
import { ModalContainer } from "../../styled-components/feature-specific";
import { BlankButtonMS, FilledButtonMS } from "../../styled-components/buttons";
import { SelectInput, TextInput, TextareaInput } from "../../styled-components/inputs";


/******************************* COMPONENT *******************************/
function UploadVideoModal({ modalFunc }) {

    /****************** access store *******************/
    const subjectsState = useSelector(state => state.subjects.allSubjects);
   
    /************ reducer/API communication ************/
    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkReadAllSubjects());
    }, [dispatch]);

    /****************** manage state *******************/
    let [subjectId, setSubjectId] = useState("");
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [url, setUrl] = useState("");
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
    const submitUpload = async (e) => {

        e.preventDefault();
        setErrors([]);
        let validationErrors = [];
        
        let findSubject = subjectsState.find(subject => subject.name === subjectId);
        subjectId = (!findSubject) ? null : findSubject.id;

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
        }

        const newVideo = await dispatch(thunkCreateSingleVideo(videoData)).catch(
            async (res) => {

                const data = await res.json();

                if (data && data.errors) {
                    data.errors.forEach(message => validationErrors.push(message));
                    setErrors(validationErrors);
                }
            }
        )

        if (newVideo) {
            modalFunc(false);
            window.scrollTo(0,0);
            history.push(`/videos/${newVideo.id}`);
        }
    };

  /**************** render component *****************/
  return (
    <>
        <RightWrapper><img src={closeIcon} onClick={(e) => modalFunc(false)}></img></RightWrapper>

        <H0Marketing>Can We Talk About</H0Marketing>

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
            <FilledButtonMS onClick={submitUpload} style={{margin:"5px"}}>Submit</FilledButtonMS>
            <BlankButtonMS onClick={() => modalFunc(false)} style={{margin:"5px"}}>Cancel</BlankButtonMS>
        </Wrapper>

    </>
  );
}


/******************************** EXPORTS ********************************/
export default UploadVideoModal;