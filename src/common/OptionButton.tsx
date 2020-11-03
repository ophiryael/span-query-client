import React from 'react';
import styled from 'styled-components';

const StyledButton = styled('button')<Pick<Props, 'isSelected'>>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  outline: none;
  font-size: 0.8rem;
  ${({ isSelected }) => `
    border: ${isSelected ? '1px solid #23bfb3' : '1px solid #0b96cb'};
    color: ${isSelected ? '#fff' : '#0b96cb'};
    background-color: ${isSelected ? '#23bfb3' : 'transparent'};
  `}
`;

interface Props {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const OptionButton: React.FC<Props> = ({ isSelected, onClick, children }) => (
  <StyledButton isSelected={isSelected} onClick={onClick}>
    {children}
  </StyledButton>
);
