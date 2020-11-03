import React from 'react';
import styled from 'styled-components';
import { Condition } from './Condition';
import { Dictionary } from '../utils/interfaces';
import { RelationSelection } from './RelationSelection';
import { SpanQuery, Query, ConditionRelation } from '../services/interfaces';
import { addSubQuery, addCondition, updateRelation, removeCondition, updateCondition } from '../utils/query-builder';

const Container = styled('div')<Pick<Props, 'isFirstLevel'>>`
  position: relative;
  border-left: 2px solid #0b96cb;
  margin-left: ${({ isFirstLevel }) => (isFirstLevel ? '0' : '4rem')};
`;

const ConditionsContainer = styled('div')`
  & > div:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

interface Props {
  isFirstLevel?: boolean;
  queryLevel: SpanQuery;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
}

export const QueryLevel: React.FC<Props> = ({ queryLevel, setQuery, isFirstLevel }) => {
  const handleRelationChange = (relation: ConditionRelation) => {
    updateRelation(setQuery, queryLevel._levelId!, relation);
  };

  const handleAddCondition = (conditionId: string, relation: ConditionRelation) => {
    if (queryLevel.relation === relation) {
      addCondition(setQuery, queryLevel._levelId!);
    } else {
      addSubQuery(setQuery, queryLevel._levelId!, conditionId);
    }
  };

  const handleRemoveCondition = (conditionId: string) => {
    removeCondition(setQuery, queryLevel._levelId!, conditionId);
  };

  const handleUpdateCondition = (conditionId: string, updatedFields: Dictionary<string>) => {
    updateCondition(setQuery, queryLevel._levelId!, conditionId, updatedFields);
  };

  return (
    <Container isFirstLevel={isFirstLevel}>
      <RelationSelection selectedRelation={queryLevel.relation} onChange={handleRelationChange} />
      <ConditionsContainer>
      {queryLevel.conditions.map(condition => (
        <Condition
          key={condition._conditionId}
          setQuery={setQuery}
          condition={condition}
          isOnlyCondition={queryLevel.conditions.length === 1}
          onAddCondition={handleAddCondition}
          onUpdateCondition={handleUpdateCondition}
          onRemoveCondition={() => handleRemoveCondition(condition._conditionId!)}
        />
      ))}
      </ConditionsContainer>
    </Container>
  );
};
