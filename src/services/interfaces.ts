export interface Query {
  limit: number;
  query: SpanQuery;
}

interface SpanQuery {
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
