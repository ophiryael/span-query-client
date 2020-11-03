import React from 'react';
import styled from 'styled-components';
import { OptionButton } from '../common/OptionButton';

const Container = styled('div')`
  margin-top: 2rem;
  
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
      <OptionButton key={limit} isSelected={limit === selectedLimit} onClick={() => onChange(limit)}>
        Last {limit}
      </OptionButton>
    ))}
  </Container>
);
