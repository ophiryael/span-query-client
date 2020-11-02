import React, { useEffect } from 'react';
import styled from 'styled-components';
import { XButton } from './XButton';

const Overlay = styled('div')<Pick<Props, 'isVisible'>>`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const ContentContainer = styled('div')`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ children, isVisible, onClose }) => {
  useEffect(() => {
    // disable scroll when modal is open
    document.body.style.overflow = isVisible ? 'hidden' : 'visible';
  }, [isVisible]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <Overlay isVisible={isVisible} onClick={onClose}>
      <ContentContainer>
        <XButton onClick={onClose} />
        {children}
      </ContentContainer>
    </Overlay>
  );
};
