import React from 'react';
import { RequestState, SelectedSpan } from './interfaces';
import { Span, SpanPreview } from '../services/interfaces';

interface Props {
  results: RequestState<SpanPreview[]>;
  selectedSpan: SelectedSpan<Span>;
  fetchSelectedSpan: (id: string) => Promise<void>;
}

export const QueryResultsTable: React.FC<Props> = ({ results, selectedSpan, fetchSelectedSpan }) => {
  return null;
};
