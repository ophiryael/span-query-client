import React from 'react';
import styled from 'styled-components';
import { QueryBuilder } from './query-builder/QueryBuilder';

const Title = styled('h1')`
  color: #fff;
  font-size: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #2a3c41;
`;

export const App: React.FC = () => (
  <main>
    <Title>SpanQuery</Title>
    <QueryBuilder />
  </main>
);
