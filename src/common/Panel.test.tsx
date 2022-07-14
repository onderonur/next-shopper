import { customRender } from '@src/testing/TestingUtils';
import { screen, within } from '@testing-library/react';
import Panel from './Panel';

test('shows only content', () => {
  customRender(<Panel>Some content</Panel>);

  const content = screen.getByTestId('panel-content');
  expect(content).toHaveTextContent('Some content');

  const title = screen.queryByTestId('panel-title');
  expect(title).not.toBeInTheDocument();

  const actions = screen.queryByTestId('panel-actions');
  expect(actions).not.toBeInTheDocument();
});

test('shows content with title and action', () => {
  customRender(
    <Panel title="Some title" actions="Some actions">
      Some content
    </Panel>,
  );

  const content = screen.getByTestId('panel-content');
  expect(content).toHaveTextContent('Some content');

  const title = screen.getByTestId('panel-title');
  expect(title).toHaveTextContent('Some title');

  const actions = screen.getByTestId('panel-actions');
  expect(actions).toHaveTextContent('Some actions');
});

test('shows loading spinner when loading', () => {
  customRender(<Panel isLoading>Some content</Panel>);

  const content = screen.getByTestId('panel-content');
  expect(content).not.toHaveTextContent('Some content');

  const loading = within(content).getByTestId('loading-spinner');
  expect(loading).toBeInTheDocument();
});
