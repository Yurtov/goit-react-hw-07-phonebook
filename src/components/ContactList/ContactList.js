import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import {
  List,
  ContactItem,
  Span,
  ActionBtn,
  Stub,
  BtnContainer,
} from './ContactList.styled';

export const ContactList = ({ onClick }) => {
  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  return (
    <List>
      {contacts.length !== 0 ? (
        contacts
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(contact => (
            <ContactItem key={contact.id}>
              <Span>
                {contact.name}: {contact.phone}
                <BtnContainer>
                  <ActionBtn type="button" onClick={onClick} data-btn="btn-change">
                    <AiOutlineEdit size={27} />
                  </ActionBtn>
                  <ActionBtn
                    type="button"
                    onClick={() => {
                      dispatch(deleteContact(contact.id));
                    }}
                  >
                    <AiOutlineDelete size={27} />
                  </ActionBtn>
                </BtnContainer>
              </Span>
            </ContactItem>
          ))
      ) : (
        <Stub>Not found</Stub>
      )}
    </List>
  );
};
