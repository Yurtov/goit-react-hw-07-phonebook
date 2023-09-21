import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from 'redux/contactsReducer';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import {
  StyledForm,
  Label,
  StyledField,
  StyledErrorMessage,
  Button,
} from './ContactForm.styled';

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required')
    .matches(
      nameRegExp,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: Yup.string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

export const ContactForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        contacts.some(
          contact =>
            contact.name.toLowerCase().trim() ===
              values.name.toLowerCase().trim() ||
            contact.number.trim() === values.number.trim()
        )
          ? alert(`${values.name} or ${values.number} is already in contact`)
          : dispatch(
              addContact({
                id: nanoid(),
                ...values,
              })
            ) &&
            onClose() &&
            actions.resetForm();
      }}
    >
      <StyledForm>
        <Label>
          Name <AiOutlineUser />
          <StyledField name="name" />
          <br />
          <StyledErrorMessage name="name" component="div" />
        </Label>

        <Label>
          Number <AiOutlinePhone />
          <StyledField name="number" />
          <br />
          <StyledErrorMessage name="number" component="div" />
        </Label>

        <Button type="submit">Add contact</Button>
      </StyledForm>
    </Formik>
  );
};
