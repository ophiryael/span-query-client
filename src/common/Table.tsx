import styled from 'styled-components';

export const Table = styled('table')`
  text-align: left;
  padding: 0.2rem;
  min-width: 100%;

  & thead {
    color: #5f6368;
  }

  & tbody {
    color: #202124;
  }

  & th,
  td {
    padding: 0.5rem;
  }

  & tbody > tr:hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;
