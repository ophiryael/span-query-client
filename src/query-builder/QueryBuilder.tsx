import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { SpanQuery } from './interfaces';
import { ResultLimitSelect } from './ResultLimitSelect';

const Section = styled('section')`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

const ButtonsContainer = styled('div')`
  align-self: flex-end;

  & > button:first-child {
    margin-right: 1rem;
  }
`;

const maxResultLimits = [5, 10, 15, 20];

const initialQuery: SpanQuery = {
  limit: 5,
  relation: 'and',
  conditions: [
    {
      type: 'tag',
      field: '',
      operator: 'equals',
      value: '',
    },
  ],
};

export const QueryBuilder: React.FC = () => {
  const [query, setQuery] = useState<SpanQuery>(initialQuery);

  const handleResultLimitChange = (limit: number) => {
    setQuery(query => ({ ...query, limit }));
  };

  return (
    <Section>
      <ResultLimitSelect
        resultLimits={maxResultLimits}
        selectedLimit={query.limit}
        onChange={handleResultLimitChange}
      />
      <ButtonsContainer>
        <Button filled>Run Query</Button>
        <Button onClick={() => setQuery(initialQuery)}>Reset</Button>
      </ButtonsContainer>
    </Section>
  );
};
