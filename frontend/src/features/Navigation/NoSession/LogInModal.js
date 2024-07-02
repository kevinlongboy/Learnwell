/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// local files
import * as sessionActions from "../../../store/sessionReducer";
import closeIcon from "../../../assets/icons/x-icon.svg";
import Errors from "../../../reusable-components/Errors";
import { RightWrapper } from "../../../styled-components/containers";
import { H0Marketing } from "../../../styled-components/text";
import { ModalContainer } from "../../../styled-components/feature-specific";
import { TextInput } from "../../../styled-components/inputs";
import { ModalButtonBlank, ModalButtonFilled, ModalButtonOutline } from "../../../styled-components/buttons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


/******************************* COMPONENT *******************************/
function LogInModal({ modalFunc, contentFunc }) {

    /****************** manage state *******************/
    let [credential, setCredential] = useState("");
    let [password, setPassword] = useState("");
    let [errors, setErrors] = useState([]);
    
    /****************** key into pertinent values *******************/
    const history = useHistory();
    const dispatch = useDispatch();
    const fields = [
        {
            type: "text",
            placeholder: "Email address",
            value: credential,
            required: true,
            manageState: setCredential

        },
        {
            type: "password",
            placeholder: "Password",
            value: password,
            required: true,
            manageState: setPassword
        },
    ];

    /****************** handle events *******************/
    const submitDemoUser = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential: 'demo_user@email.com', password: 'demoPassword' }));
        window.scrollTo(0,0);
        history.push("/videos");
    };


    const submitLogin = (e) => {

        e.preventDefault();
        setErrors([]);
        let validationErrors = [];

        fields.forEach(field => {
            if (!field.value) validationErrors.push(`Please enter your ${field.placeholder.toLocaleLowerCase()}`)
        });

        setErrors(validationErrors);
        if (validationErrors.length) return;
    
        window.scrollTo(0,0);
        dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    validationErrors.push(data.message)
                    setErrors([...validationErrors])
                    return
                };
            }
        )
        history.push("/videos");
    };

  /**************** render component *****************/
  return (
    <>
        <RightWrapper><img src={closeIcon} onClick={(e) => modalFunc(false)}></img></RightWrapper>
        
        <H0Marketing>Welcome Back</H0Marketing>

        <ModalContainer>
        {
            fields.map((field) => (
                <label>
                    <TextInput size={"large"}
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
        </ModalContainer>

        {errors && <Errors array={errors} />}

        <ModalButtonFilled onClick={submitLogin}>Log In</ModalButtonFilled>
        <ModalButtonBlank onClick={submitDemoUser}>Continue as Guest User</ModalButtonBlank>
        <ModalButtonOutline onClick={(e) => contentFunc("SignUp")}>Sign Up</ModalButtonOutline>

    </>
  );
}


/******************************** EXPORTS ********************************/
export default LogInModal;