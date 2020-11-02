import React from 'react';
import styled from 'styled-components';
import { Spinner } from '../common/Spinner';

const Container = styled('div')`
  position: relative;
  width: 100%;
  min-height: 15rem;
  background-color: #fff;
  border-radius: 5px;
`;

const StatusContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorText = styled('div')`
  color: #1d2f31;
  font-size: 1.4rem;
  white-space: nowrap;
`;

interface Props {
  error?: string;
  isLoading: boolean;
  children: React.ReactNode;
}

export const StatusOverlay: React.FC<Props> = ({ error, isLoading, children }) => {
  let statusContent: React.ReactNode = null;
  if (isLoading) {
    statusContent = <Spinner />;
  } else if (error) {
    statusContent = <ErrorText>{error}</ErrorText>;
  }

  return (
    <Container>
      <StatusContainer>{statusContent}</StatusContainer>
      {children}
    </Container>
  );
};
