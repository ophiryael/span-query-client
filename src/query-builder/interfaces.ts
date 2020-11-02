import { Span } from '../services/interfaces';

export interface RequestState<T> {
  data?: T;
  error?: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface SelectedSpanState extends RequestState<Span> {
  id?: string;
}
