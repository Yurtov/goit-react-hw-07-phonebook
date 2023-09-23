import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
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
import { fetchContacts } from 'redux/operations';

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

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const openModal = e => 
  // console.log(e.currentTarget.getAttribute('data-btn'));
  setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <Title>Phonebook</Title>
      <BtnOpen onClick={openModal} data-btn="btn-add">
        <AiOutlineUserAdd size={45} />
      </BtnOpen>

      <Contacts>
        <SubTitle>Contacts</SubTitle>
        {isLoading && !error && <b>Request in progress...</b>}

        {contacts.length > 0 ? (
          <div>
            <Filter />
            <ContactList onClick={openModal} />
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
        <ContactForm onClose={closeModal} style={customStyles} />
      </Modal>
    </Layout>
  );
};
