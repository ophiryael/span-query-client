import styled from 'styled-components';

interface Props {
  filled?: boolean;
}

export const Button = styled('button')<Props>`
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #0b96cb;
  padding: 0.5rem 1rem;
  outline: none;
  transition: all 0.1s ease-in-out;
  ${({ filled }) => `
    color: ${filled ? '#fff' : '#0b96cb'};
    background-color: ${filled ? '#0b96cb' : 'transparent'};
  `}

  &:hover {
    color: #fff;
    background-color: #0b96cb;
  }

  &:disabled {
    cursor: default;
    color: #d3d3d3;
    border-color: #d3d3d3;
    background-color: transparent;
  }
`;
