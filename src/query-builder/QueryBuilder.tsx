import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { QueryResultsTable } from './QueryResultsTable';
import { ResultLimitSelect } from './ResultLimitSelect';
import { RequestState, SelectedSpan } from './interfaces';
import { getSpansByQuery, getSpanById } from '../services/spans';
import { Query, Span, SpanPreview } from '../services/interfaces';

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

const initialQuery: Query = {
  limit: 10,
  query: {
    relation: 'or',
    conditions: [
      {
        type: 'tag',
        field: 'resource.type',
        operator: 'equals',
        value: 'http',
      },
      {
        type: 'span',
        field: 'duration',
        operator: 'greaterThan',
        value: 1000,
      },
    ],
  },
};

export const QueryBuilder: React.FC = () => {
  const [query, setQuery] = useState<Query>(initialQuery);
  const [selectedSpan, setSelectedSpan] = useState<SelectedSpan<Span>>({ status: 'idle' });
  const [results, setResults] = useState<RequestState<SpanPreview[]>>({ status: 'idle' });

  const handleResultLimitChange = (limit: number): void => {
    setQuery(query => ({ ...query, limit }));
  };

  const fetchSelectedSpan = async (id: string): Promise<void> => {
    setSelectedSpan({ id, status: 'loading' });
    try {
      const data = await getSpanById(id);
      setSelectedSpan({ id, data, status: 'succeeded' });
    } catch (err) {
      setSelectedSpan({ id, status: 'failed', error: 'Oops, we were unable to fetch the selected span.' });
    }
  };

  const fetchResults = useCallback(async (): Promise<void> => {
    setResults({ status: 'loading' });
    try {
      const data = await getSpansByQuery(query);
      setResults({ data, status: 'succeeded' });
    } catch (err) {
      setResults({ status: 'failed', error: 'Oops, we were unable to fetch the requested spans.' });
    }
  }, [query]);

  useEffect(() => {
    if (results.status === 'idle') {
      fetchResults();
    }
  }, [fetchResults, results.status]);

  return (
    <Section>
      <ResultLimitSelect
        resultLimits={maxResultLimits}
        selectedLimit={query.limit}
        onChange={handleResultLimitChange}
      />
      <ButtonsContainer>
        <Button filled onClick={fetchResults} disabled={results.status === 'loading'}>
          Run Query
        </Button>
        <Button onClick={() => setQuery(initialQuery)}>Reset</Button>
      </ButtonsContainer>
      <QueryResultsTable results={results} selectedSpan={selectedSpan} fetchSelectedSpan={fetchSelectedSpan} />
    </Section>
  );
};
