import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled('div')`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 3px solid #fff;
  border-top: 3px solid #555;
  animation: ${rotate} 1.2s linear infinite;
`;
