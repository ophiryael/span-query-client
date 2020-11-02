import React, { useState } from 'react';
import styled from 'styled-components';
import { StatusOverlay } from './StatusOverlay';
import { RequestState, SelectedSpan } from './interfaces';
import { Span, SpanPreview } from '../services/interfaces';

const Table = styled('table')`
  text-align: left;
  padding: 0.2rem;
  min-width: 100%;
  
  & thead {
    color: #5f6368;
  }

  & tbody {
    color: #202124;
  }

  & th, td {
    padding: 0.5rem;
  }

  & tbody > tr:hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;

interface Props {
  results: RequestState<SpanPreview[]>;
  selectedSpan: SelectedSpan<Span>;
  fetchSelectedSpan: (id: string) => Promise<void>;
}

const spanColumns = ['ID', 'Parent ID', 'Operation', 'Start time', 'Duration'];

export const QueryResults: React.FC<Props> = ({ results, selectedSpan, fetchSelectedSpan }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRowClick = (id: string) => {
    setIsModalOpen(true);
    fetchSelectedSpan(id);
  };

  return (
    <StatusOverlay isLoading={results.status === 'loading'} error={results.error}>
      <Table>
        <thead>
          <tr>
            {spanColumns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.data &&
            results.data.map(res => (
              <tr key={res.spanId} onClick={() => handleRowClick(res.spanId)}>
                <td>{res.spanId}</td>
                <td>{res.parentSpanId}</td>
                <td>{res.operationName}</td>
                <td>{new Date(res.startTime).toLocaleString()}</td>
                <td>{res.duration} ms</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </StatusOverlay>
  );
};
