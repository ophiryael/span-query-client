import { serverApi } from '../utils/api-instance';
import { Query, SpanPreview, Span } from './interfaces';

export async function getSpansByQuery(query: Query): Promise<SpanPreview[]> {
  const res = await serverApi.post('spans/query', query);
  return res.data.spans;
}

export async function getSpanById(id: string): Promise<Span> {
  const res = await serverApi.get(`spans/${id}`);
  return res.data.span;
}
