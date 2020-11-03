import React from 'react';
import styled from 'styled-components';
import { ConditionRelation } from '../services/interfaces';
import { OptionButton } from '../common/OptionButton';

const Container = styled('div')`
  position: absolute;
  top: 50%;
  transform: translate(calc(-100% - 0.5rem), -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > button {
    padding: 0.25rem 0.6rem;
    display: block;
  }

  & > button:first-child {
    margin-bottom: 0.3rem;
  }
`;

interface Props {
  selectedRelation: ConditionRelation;
  onChange: (relation: ConditionRelation) => void;
}

const relations = ['and', 'or'] as const;

export const RelationSelection: React.FC<Props> = ({ selectedRelation, onChange }) => (
  <Container>
    {relations.map(relation => (
      <OptionButton key={relation} isSelected={selectedRelation === relation} onClick={() => onChange(relation)}>
        {relation.toUpperCase()}
      </OptionButton>
    ))}
  </Container>
);
