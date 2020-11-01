export interface RequestState<T> {
  data?: T;
  error?: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface SelectedSpan<T> extends RequestState<T> {
  id?: string;
}
