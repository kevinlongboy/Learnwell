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
import { ModalButtonBlank, ModalButtonFilled } from "../../../styled-components/buttons";


/******************************* COMPONENT *******************************/
function SignUpModal({ modalFunc, contentFunc }) {

  /****************** manage state *******************/
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  
  /****************** key into pertinent values *******************/
  const dispatch = useDispatch();
  const fields = [
      {
        type: "text",
        placeholder: "First name",
        value: firstName,
        required: true,
        manageState: setFirstName,
      },
      {
        type: "text",
        placeholder: "Last name",
        value: lastName,
        required: true,
        manageState: setLastName,
      },
      {
        type: "text",
        placeholder: "Email",
        value: email,
        required: true,
        manageState: setEmail,
      },
      {
        type: "text",
        placeholder: "Username",
        value: username,
        required: true,
        manageState: setUsername,
      },
      {
        type: "password",
        placeholder: "Password",
        value: password,
        required: true,
        manageState: setPassword,
      },
      {
        type: "password",
        placeholder: "Confirm password",
        value: confirmPassword,
        required: true,
        manageState: setConfirmPassword,
      },
  ];

  /****************** handle events *******************/
  const submitSignUp = (e) => {

    e.preventDefault();
    let validationErrors = [];

    if (password !== confirmPassword) validationErrors.push("Passwords don't match");
    fields.slice(0, fields.length -1).forEach(field => {
      if (!field.value) validationErrors.push(`Please enter your ${field.placeholder.toLocaleLowerCase()}`)
    });

    setErrors(validationErrors);
    if (validationErrors.length) return;

    setErrors([]);
    let userData = {firstName, lastName, username, password, email }
    return dispatch(sessionActions.signup(userData)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          data.errors.forEach(message => validationErrors.push(message));
          setErrors(validationErrors);
        }
      }
    );
  };

  /**************** render component *****************/
  return (
    <>
        <RightWrapper>
            <img src={closeIcon} onClick={(e) => modalFunc(false)}></img>
        </RightWrapper>

        <H0Marketing>Get Schooled</H0Marketing>

        <ModalContainer>
          {
            fields.map((field) => (
              <label>
                    <TextInput size={"medium"}
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

        {errors.length > 0 && <Errors array={errors} />}

        <ModalButtonFilled onClick={submitSignUp}>Sign Up</ModalButtonFilled>
        <ModalButtonBlank onClick={(e) => contentFunc("LogIn")}>Sign In Instead</ModalButtonBlank>
    </>
  );
}


/******************************** EXPORTS ********************************/
export default SignUpModal;
