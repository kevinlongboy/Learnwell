/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from 'react';
// local files
import LogInModal from './LogInModal';
import SignUpModal from './SignUpModal';
import { Modal } from '../../../context/Modal';
import { BlankButtonMS, FilledButtonMS } from '../../../styled-components/buttons';


/******************************* COMPONENT *******************************/
function NoSession() {

    /****************** manage state *******************/
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("LogIn");
    
    /****************** condition *******************/
    let content = modalContent === "LogIn" ? 
        <LogInModal modalFunc={setShowModal} contentFunc={setModalContent} /> : 
        <SignUpModal modalFunc={setShowModal} contentFunc={setModalContent} />

    /**************** render component *****************/
    return (
        <>
            <BlankButtonMS onClick={() => { setModalContent("LogIn"); setShowModal(true) }}>Log In</BlankButtonMS>
            <FilledButtonMS onClick={() => { setModalContent("SignUp"); setShowModal(true) }}>Sign Up</FilledButtonMS>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {content}
                </Modal>
            )}
        </>
    );
};


/******************************** EXPORTS ********************************/
export default NoSession;
