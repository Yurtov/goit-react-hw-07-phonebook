import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 15px;
  font-size: 25px;
`;

export const ContactItem = styled.li`
`;

export const Span = styled.span`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteBtn = styled.button`
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover,
  :focus {
    transform: scale(1.03);
    color: red;
  }
`;

export const Stub = styled.div`
  color: red;
`;
