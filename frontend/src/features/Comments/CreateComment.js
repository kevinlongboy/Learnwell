/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
// local files
import { thunkCreateSingleComment } from "../../store/commentsReducer";
import Errors from "../../reusable-components/Errors";
import { thunkReadSingleVideoComments } from "../../store/videosReducer";
import { FilledButtonMA } from "../../styled-components/buttons";
import { TextareaInput } from "../../styled-components/inputs";
import { RightWrapper } from "../../styled-components/containers";


/******************************* COMPONENT *******************************/
function CreateComment({videoId}) {

    /************ reducer/API communication ************/
    const history = useHistory();
    const dispatch = useDispatch();

    /****************** manage state *******************/
    let [comment, setComment] = useState("");
    let [errors, setErrors] = useState([]);
    
    /****************** key into pertinent values *******************/
    const textareaFields = [
        {
            type: "textarea",
            placeholder: "Comment",
            value: comment,
            required: true,
            manageState: setComment,
        },
    ];

    /****************** handle events *******************/
    const submitComment = async (e) => {

        e.preventDefault();
        setErrors([]);
        let validationErrors = [];

        // validate inputs
        textareaFields.forEach(field => {
            if (!field.value) validationErrors.push(`${field.placeholder} is required`)
            });
        
        setErrors(validationErrors);
        if (validationErrors.length) return;


        let commentData = {
            comment: comment
        }

        const newComment = await dispatch(thunkCreateSingleComment(videoId, commentData)).catch(
            async (res) => {

                const data = await res.json();

                if (data && data.errors) {
                    data.errors.forEach(message => validationErrors.push(message));
                    setErrors(validationErrors);
                }
            }
        )

        if (newComment) {
            setComment("")
            dispatch(thunkReadSingleVideoComments(videoId))
        }
    };

    /**************** render component *****************/
    return (
        <> 
            {
                textareaFields.map((field) => (
                    <TextareaInput 
                        size={"large"}
                        key={field.placeholder}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        required={field.required}
                        onChange={(e) => field.manageState(e.target.value)}
                        >
                    </TextareaInput>
                ))
            }

            {errors && <Errors array={errors} />}

            <RightWrapper><FilledButtonMA onClick={submitComment}>Comment</FilledButtonMA></RightWrapper>
        </>
    );
}


/******************************** EXPORTS ********************************/
export default CreateComment;
