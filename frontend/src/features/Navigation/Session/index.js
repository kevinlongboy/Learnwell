/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from 'react';
// local files
import UserMenu from './UserMenu';
import UploadVideoModal from '../../Videos/UploadVideoModal';
import { Modal } from '../../../context/Modal';
import { BlankButtonMS, FilledButtonMS } from '../../../styled-components/buttons';


/******************************* COMPONENT *******************************/
function Session({ sessionUser }) {

    /****************** manage state *******************/
    const [showModal, setShowModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleMenu = () => { showUserMenu ? setShowUserMenu(false) : setShowUserMenu(true)}

  /**************** render component *****************/
  return (
    <>
        <FilledButtonMS onClick={() => { setShowModal(true) }}>Discuss 🎙️</FilledButtonMS>
        <BlankButtonMS onClick={toggleMenu}>🙋</BlankButtonMS>

        {showUserMenu && <UserMenu sessionUser={sessionUser} handleMenu={setShowUserMenu}/>} 

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
              <UploadVideoModal modalFunc={setShowModal} />
          </Modal>
        )}
    </>
  );
};


/******************************** EXPORTS ********************************/
export default Session;
