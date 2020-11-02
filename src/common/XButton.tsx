import styled from 'styled-components';

export const XButton = styled('button')`
  position: absolute;
  z-index: 2;
  top: 0.6rem;
  right: 0.6rem;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: #fff;

  &:after {
    content: 'X';
    font-size: 1.25rem;
  }

  &:hover {
    background-color: #f7f8f8;
  }
`;
