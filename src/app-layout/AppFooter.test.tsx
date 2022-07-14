import { APP_REPOSITORY_URL, APP_TITLE } from '@src/common/CommonUtils';
import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import AppFooter from './AppFooter';

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date('2022'));
});

afterAll(() => {
  jest.useRealTimers();
});

test('shows current year, app title and repository link', () => {
  customRender(<AppFooter />);

  const footer = screen.getByText(`2022 © ${APP_TITLE}`);
  expect(footer).toBeInTheDocument();

  const link = screen.getByRole('link', {
    name: 'Check the Source Code on GitHub',
  });
  expect(link).toHaveAttribute('href', APP_REPOSITORY_URL);
});
