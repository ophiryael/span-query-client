import React from 'react';
import styled from 'styled-components';
import { Table } from '../common/Table';
import { StatusOverlay } from './StatusOverlay';
import { SelectedSpanState } from './interfaces';

const StyledStatusOverlay = styled(StatusOverlay)`
  overflow: scroll;
  max-height: 90%;
  max-width: 90%;
`;

const StyledTable = styled(Table)`
  & tbody > tr:hover {
    cursor: default;
  }
`;

interface Props {
  span: SelectedSpanState;
}

const columns = ['Type', 'Timestamp', 'Key', 'Value'];

export const SpanDetails: React.FC<Props> = ({ span }) => (
  <StyledStatusOverlay isLoading={span.status === 'loading'} error={span.error}>
    <StyledTable onClick={e => e.stopPropagation()}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {span.data?.tags?.map((tag, idx) => (
          <tr key={idx}>
            <td>Tag</td>
            <td />
            <td>{tag.key}</td>
            <td>{tag.value}</td>
          </tr>
        ))}
        {span.data?.logs?.map((log, idx) => (
          <tr key={idx}>
            <td>Log</td>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.key}</td>
            <td>{log.value}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </StyledStatusOverlay>
);
