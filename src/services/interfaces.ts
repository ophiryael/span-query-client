export interface Query {
  limit: number;
  query: SpanQuery;
}

export interface SpanQuery {
  _levelId?: string;
  relation: ConditionRelation;
  conditions: Condition[];
}

export type ConditionRelation = 'and' | 'or';

export type Condition = SpanCondition | TagOrLogCondition;

interface SpanCondition extends BaseCondition {
  type: 'span';
  field: 'spanId' | 'parentSpanId' | 'operationName' | 'startTime' | 'duration';
}

interface TagOrLogCondition extends BaseCondition {
  type: 'tag' | 'log';
  field: string;
}

interface BaseCondition {
  _conditionId?: string;
  operator: ConditionOperator;
  value?: string | number;
  subQuery?: SpanQuery;
}

export type ConditionOperator = 'equals' | 'greaterThan' | 'lessThan' | 'isTrue' | 'isFalse';

export interface SpanPreview {
  spanId: string;
  parentSpanId: string;
  operationName: string;
  startTime: string;
  duration: number;
}

export interface Span extends SpanPreview {
  tags: SpanTag[];
  logs: SpanLog[];
}

interface SpanTag {
  key: string;
  value: string;
}

interface SpanLog extends SpanTag {
  timestamp: string;
}
