import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../common/Button';
import { QueryLevel } from './QueryLevel';
import { QueryResults } from './QueryResults';
import { ResultLimitSelect } from './ResultLimitSelect';
import { Query, SpanPreview } from '../services/interfaces';
import { RequestState, SelectedSpanState } from './interfaces';
import { getSpansByQuery, getSpanById } from '../services/spans';

const Section = styled('section')`
  width: 60rem;
  margin: 0.5rem 0;
`;

const ButtonsContainer = styled('div')`
  text-align: right;
  margin: 1rem 0 2rem;

  & > button:first-child {
    margin-right: 1rem;
  }
`;

const maxResultLimits = [5, 10, 15, 20];

const initialQuery: Query = {
  limit: 10,
  query: {
    _levelId: uuidv4(),
    relation: 'or',
    conditions: [
      {
        _conditionId: uuidv4(),
        type: 'tag',
        field: 'resource.type',
        operator: 'equals',
        value: 'http',
      },
      {
        _conditionId: uuidv4(),
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
  const [selectedSpan, setSelectedSpan] = useState<SelectedSpanState>({ status: 'idle' });
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
      <QueryLevel queryLevel={query.query} setQuery={setQuery} isFirstLevel />
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
      <QueryResults results={results} selectedSpan={selectedSpan} fetchSelectedSpan={fetchSelectedSpan} />
    </Section>
  );
};
