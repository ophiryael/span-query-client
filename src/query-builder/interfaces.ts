export interface SpanQuery {
  limit: number;
  relation: ConditionRelation;
  conditions: Condition[];
}

type ConditionRelation = 'and' | 'or';

type Condition = SpanCondition | TagOrLogCondition;

interface SpanCondition extends BaseCondition {
  type: 'span';
  field: 'spanId' | 'parentSpanId' | 'operationName' | 'startTime' | 'duration';
}

interface TagOrLogCondition extends BaseCondition {
  type: 'tag' | 'log';
  field: string;
}

interface BaseCondition {
  operator: 'equals' | 'greaterThan' | 'lessThan' | 'isTrue' | 'isFalse';
  value?: string | number;
  subQuery?: SpanQuery;
}
