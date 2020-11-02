import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Table } from '../common/Table';
import { SpanDetails } from './SpanDetails';
import { StatusOverlay } from './StatusOverlay';
import { SpanPreview } from '../services/interfaces';
import { RequestState, SelectedSpanState } from './interfaces';

interface Props {
  results: RequestState<SpanPreview[]>;
  selectedSpan: SelectedSpanState;
  fetchSelectedSpan: (id: string) => Promise<void>;
}

const columns = ['ID', 'Parent ID', 'Operation', 'Start time', 'Duration'];

export const QueryResults: React.FC<Props> = ({ results, selectedSpan, fetchSelectedSpan }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleRowClick = (id: string) => {
    setIsModalOpen(true);
    fetchSelectedSpan(id);
  };

  return (
    <>
      <StatusOverlay isLoading={results.status === 'loading'} error={results.error}>
        <Table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.data?.map(res => (
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
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SpanDetails span={selectedSpan} />
      </Modal>
    </>
  );
};
