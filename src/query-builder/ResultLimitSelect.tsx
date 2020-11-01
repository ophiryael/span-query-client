import React from 'react';
import styled from 'styled-components';
import { ResultLimitOption } from './ResultLimitOption';

const Container = styled('div')`
  & > button:not(:last-child) {
    margin-right: 1rem;
  }
`;

interface Props {
  selectedLimit: number;
  onChange: (value: number) => void;
  resultLimits: number[];
}

export const ResultLimitSelect: React.FC<Props> = ({ resultLimits, selectedLimit, onChange }) => (
  <Container>
    {resultLimits.map(limit => (
      <ResultLimitOption key={limit} isSelected={limit === selectedLimit} onClick={() => onChange(limit)}>
        Last {limit}
      </ResultLimitOption>
    ))}
  </Container>
);
