import React from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { QueryLevel } from './QueryLevel';
import { Dictionary } from '../utils/interfaces';
import { ConditionBuilder } from './ConditionBuilder';
import { Condition as ICondition, ConditionRelation, Query } from '../services/interfaces';

const Container = styled('div')`
  margin: 1rem 0 0 1rem;
`;

const ButtonsContainer = styled('div')`
  margin-top: 0.5rem;

  & > button:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const ActionButton = styled(Button)`
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
`;

interface Props {
  isOnlyCondition: boolean;
  condition: ICondition;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  onUpdateCondition: (conditionId: string, updatedFields: Dictionary<string>) => void;
  onRemoveCondition: () => void;
  onAddCondition: (conditionId: string, relation: ConditionRelation) => void;
}

export const Condition: React.FC<Props> = ({
  isOnlyCondition,
  condition,
  setQuery,
  onAddCondition,
  onUpdateCondition,
  onRemoveCondition,
}) => {
  const handleAddCondition = (relation: ConditionRelation): void => {
    onAddCondition(condition._conditionId!, relation);
  };

  const handleUpdateCondition = (updatedFields: Dictionary<string>) => {
    onUpdateCondition(condition._conditionId!, updatedFields);
  };

  return (
    <Container>
      <ConditionBuilder condition={condition} onChange={handleUpdateCondition} />
      <ButtonsContainer>
        <ActionButton onClick={() => handleAddCondition('and')}>AND</ActionButton>
        <ActionButton onClick={() => handleAddCondition('or')}>OR</ActionButton>
        {!isOnlyCondition && <ActionButton onClick={onRemoveCondition}>REMOVE</ActionButton>}
      </ButtonsContainer>
      {condition.subQuery && <QueryLevel queryLevel={condition.subQuery} setQuery={setQuery} />}
    </Container>
  );
};
