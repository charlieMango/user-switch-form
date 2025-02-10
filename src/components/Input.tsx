import styled from 'styled-components';

type InputProps = {
    type: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  
    &:focus {
      border-color: #007bff;
      outline: none;
    }
  `;

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {
    return <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default Input;