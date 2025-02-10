import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button' }) => {
    return <StyledButton onClick={onClick} type={type}>{children}</StyledButton>;
};

export default Button;