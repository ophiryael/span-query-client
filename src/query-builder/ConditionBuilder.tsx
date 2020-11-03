import React from 'react';
import styled from 'styled-components';
import { Dictionary } from '../utils/interfaces';
import { Condition } from '../services/interfaces';

const Container = styled('div')`
  & > * {
    margin-right: 0.5rem;
  }

  & select,
  input {
    color: #fff;
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid #fff;
  }
`;

interface Props {
  condition: Condition;
  onChange: (updatedFields: Dictionary<string>) => void;
}

const conditionTypes = ['log', 'tag', 'spanId', 'parentSpanId', 'operationName', 'startTime', 'duration'];
const operatorToText: Dictionary<string> = {
  equals: 'equals to',
  greaterThan: 'greater than',
  lessThan: 'less than',
  isTrue: 'is true',
  isFalse: 'is false',
};

export const ConditionBuilder: React.FC<Props> = ({ condition, onChange }) => (
  <Container>
    <select
      value={condition.type === 'span' ? condition.field : condition.type}
      onChange={e => onChange({ type: e.target.value })}
    >
      {conditionTypes.map(type => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
    {condition.type !== 'span' && (
      <input
        type="text"
        placeholder="key"
        value={condition.field}
        onChange={e => onChange({ field: e.target.value })}
      />
    )}
    <select value={condition.operator} onChange={e => onChange({ operator: e.target.value })}>
      {Object.keys(operatorToText).map(operator => (
        <option key={operator} value={operator}>
          {operatorToText[operator]}
        </option>
      ))}
    </select>
    {!['isTrue', 'isFalse'].includes(condition.operator) && (
      <input
        type="text"
        placeholder="value"
        value={condition.value}
        onChange={e => onChange({ value: e.target.value })}
      />
    )}
  </Container>
);
