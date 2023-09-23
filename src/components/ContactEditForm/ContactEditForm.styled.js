import styled from 'styled-components';
import { Field, Form, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

export const Label = styled.label`
  font-size: 30px;
  display: flex;
  align-items: center;
`;

export const StyledField = styled(Field)`
  margin-left: 15px;
  height: 25px;
  font-size: 20px;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 15px;
  margin-top: 5px;
  color: #f71d05;
`;

export const Button = styled.button`
  margin: 20px auto 0;
  font-size: 20px;
  cursor: pointer;
  width: 250px;
`;
