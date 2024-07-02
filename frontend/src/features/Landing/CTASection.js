/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from 'react';
// local files
import { CTASectionContainer } from '../../styled-components/feature-specific';
import video1 from "../../assets/landing-graphics/video1.gif";
import video2 from "../../assets/landing-graphics/video2.gif";
import video3 from "../../assets/landing-graphics/video3.gif";
import video4 from "../../assets/landing-graphics/video4.gif";
import video5 from "../../assets/landing-graphics/video5.gif";
import video6 from "../../assets/landing-graphics/video6.gif";
import video7 from "../../assets/landing-graphics/video7.gif";
import video8 from "../../assets/landing-graphics/video8.gif";
import { H0Marketing, H3Information } from '../../styled-components/text';
import { Wrapper } from '../../styled-components/containers';
import SignUpModal from '../Navigation/NoSession/SignUpModal';
import { Modal } from '../../context/Modal';
import LogInModal from '../Navigation/NoSession/LogInModal';


/******************************* COMPONENT *******************************/
function CTASection() {

    /****************** manage state *******************/
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("SignUp");

    /****************** condition *******************/
    let content = modalContent === "LogIn" ? 
    <LogInModal modalFunc={setShowModal} contentFunc={setModalContent} /> : 
    <SignUpModal modalFunc={setShowModal} contentFunc={setModalContent} />


    return (
        <CTASectionContainer>
            <div>
                <img src={video1}></img>
            </div>

            <div>
                <img src={video2} style={{width:"50%"}}></img>
                <img src={video3} style={{width:"50%"}}></img>
            </div>
            
            <div>
                <img src={video4}></img>
            </div>

            <div>
                <Wrapper>
                    <H0Marketing style={{textAlign:"center"}}>Learn Something New 🤓🤓</H0Marketing>
                    <Wrapper><H3Information onClick={() => setShowModal(true) }>Get Started</H3Information></Wrapper>

                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            {content}
                        </Modal>
                    )}
                </Wrapper>
            </div>

            <div>
                <img src={video5}></img>
            </div>

            <div>
                <img src={video6} style={{width:"50%"}}></img>
                <img src={video7} style={{width:"50%"}}></img>
            </div>

            <div>
                <img src={video8}></img>
            </div>

        </CTASectionContainer>
    )
};


/******************************** EXPORTS ********************************/
export default CTASection;