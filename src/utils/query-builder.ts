import React from 'react';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Query, SpanQuery, Condition, ConditionRelation, ConditionOperator } from '../services/interfaces';

type QueryUpdater = React.Dispatch<React.SetStateAction<Query>>;

export function addCondition(queryUpdater: QueryUpdater, levelId: string): void {
  queryUpdater(query => {
    const updatedQuery = cloneDeep(query);
    const queryLevel = findQueryLevel(updatedQuery.query, levelId);
    queryLevel.conditions.push(createEmptyCondition());
    return updatedQuery;
  });
}

function findQueryLevel(query: SpanQuery, levelId: string): SpanQuery | never {
  if (query._levelId === levelId) {
    return query;
  }
  for (const condition of query.conditions) {
    if (condition.subQuery) {
      return findQueryLevel(condition.subQuery, levelId);
    }
  }
  throw new Error('levelId does not exist in query tree');
}

function createEmptyCondition(): Condition {
  return {
    _conditionId: uuidv4(),
    type: 'tag',
    field: '',
    operator: 'equals',
    value: '',
  };
}

export function addSubQuery(queryUpdater: QueryUpdater, levelId: string, conditionId: string): void {
  queryUpdater(query => {
    const updatedQuery = cloneDeep(query);
    const queryLevel = findQueryLevel(updatedQuery.query, levelId);
    const condition = findCondition(queryLevel, conditionId);
    condition.subQuery = createEmptyQueryLevel();
    return updatedQuery;
  });
}

function findCondition(queryLevel: SpanQuery, conditionId: string): Condition {
  return queryLevel.conditions.find(c => c._conditionId === conditionId) as Condition;
}

function createEmptyQueryLevel(): SpanQuery {
  return {
    _levelId: uuidv4(),
    relation: 'and',
    conditions: [createEmptyCondition()],
  };
}

export function updateRelation(queryUpdater: QueryUpdater, levelId: string, relation: ConditionRelation) {
  queryUpdater(query => {
    const updatedQuery = cloneDeep(query);
    const queryLevel = findQueryLevel(updatedQuery.query, levelId);
    queryLevel.relation = relation;
    return updatedQuery;
  });
}

export function removeCondition(queryUpdater: QueryUpdater, levelId: string, conditionId: string): void {
  queryUpdater(query => {
    const updatedQuery = cloneDeep(query);
    const queryLevel = findQueryLevel(updatedQuery.query, levelId);
    queryLevel.conditions = queryLevel.conditions.filter(c => c._conditionId !== conditionId);
    return updatedQuery;
  });
}

interface Dictionary<T> {
  [key: string]: T;
}

export function updateCondition(
  queryUpdater: QueryUpdater,
  levelId: string,
  conditionId: string,
  updatedFields: Dictionary<string>
): void {
  queryUpdater(query => {
    const updatedQuery = cloneDeep(query);
    const queryLevel = findQueryLevel(updatedQuery.query, levelId);
    const condition = findCondition(queryLevel, conditionId);
    updateConditionFields(condition, updatedFields);
    return updatedQuery;
  });
}

function updateConditionFields(condition: Condition, updatedFields: Dictionary<string>): void {
  for (const [field, value] of Object.entries(updatedFields)) {
    if (field === 'type') {
      updateConditionByType(value, condition);
    } else if (field === 'field') {
      condition.field = value;
    } else if (field === 'operator') {
      condition.operator = value as ConditionOperator;
      condition.value = getValueByOperator(condition.operator, condition.value);
    } else if (field === 'value') {
      condition.value = getValueByOperator(condition.operator, condition.value as string);
    }
  }
}

function updateConditionByType(updatedType: string, condition: Condition): void {
  const isSpanType = !['tag', 'log'].includes(updatedType);
  if (isSpanType) {
    condition.field = updatedType;
    condition.type = 'span';
  } else {
    condition.field = condition.type === 'span' ? '' : condition.field;
    condition.type = updatedType as 'tag' | 'log';
  }
}

function getValueByOperator(operator: ConditionOperator, value: Condition['value']): Condition['value'] {
  switch (operator) {
    case 'equals':
      return value?.toString() ?? '';
    case 'greaterThan':
    case 'lessThan':
      return Number(value) || '';
    case 'isTrue':
    case 'isFalse':
      return undefined;
  }
}
