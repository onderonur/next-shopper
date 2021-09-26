import ErrorView from '@src/views/ErrorView';
import AppLayout from '@src/app-layout/AppLayout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(ErrorView as any).Layout = AppLayout;

export default ErrorView;
