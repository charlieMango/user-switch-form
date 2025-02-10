import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #007bff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
    return (
        <LoaderWrapper>
            <Spinner />
        </LoaderWrapper>
    );
};

export default Loader;