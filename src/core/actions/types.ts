export type ServerActionState<Data = unknown> =
  | { status: 'idle' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: string };
