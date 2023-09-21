import { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import {
  Layout,
  BtnOpen,
  Contacts,
  BtnClose,
  Title,
  SubTitle,
  Massage,
} from './Loyaut';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contactsReducer';

const localStorageKey = 'contacts';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
  },
};

Modal.setAppElement('#root');

export const getInitialContacts = () => {
  const savedContacts = localStorage.getItem(localStorageKey);
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return [];
};

export const App = () => {
  const contacts = useSelector(getContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <Title>Phonebook</Title>
      <BtnOpen onClick={openModal}>
        <AiOutlineUserAdd size={45} />
      </BtnOpen>

      <Contacts>
        <SubTitle>Contacts</SubTitle>

        {contacts.length > 0 ? (
          <div>
            <Filter />
            <ContactList />
          </div>
        ) : (
          <Massage>Contact list is empty</Massage>
        )}
      </Contacts>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <BtnClose onClick={closeModal}>
          <AiOutlineClose size={25} />
        </BtnClose>
        <ContactForm
          // onAddContact={addContact}
          onClose={closeModal}
          style={customStyles}
        />
      </Modal>
    </Layout>
  );
};
