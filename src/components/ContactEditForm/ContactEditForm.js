import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editContact } from 'redux/operations';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import {
  StyledForm,
  Label,
  StyledField,
  StyledErrorMessage,
  Button,
} from './ContactEditForm.styled';
import { useState } from 'react';

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
  phone: Yup.string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

export const ContactEditForm = ({ onClose, contact }) => {
  const dispatch = useDispatch();
  const [contactToEdit, setContactToEdit] = useState({ id: contact.id });

  return (
    <Formik
      initialValues={{
        name: `${contact.name}`,
        phone: `${contact.phone}`,
      }}
      validationSchema={schema}
      onSubmit={values => {
        setContactToEdit(prevState => ({
          ...prevState,
          ...values,
        }));
        dispatch(editContact(contactToEdit));
        onClose();
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
          <StyledField name="phone" />
          <br />
          <StyledErrorMessage name="phone" component="div" />
        </Label>

        <Button type="submit">Add contact</Button>
      </StyledForm>
    </Formik>
  );
};
