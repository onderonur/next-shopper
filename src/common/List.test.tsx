import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import List from './List';
import ListItem from './ListItem';

const options = ['Option 0', 'Option 1'];

test('shows list items', () => {
  customRender(
    <List>
      {options.map((option) => (
        <ListItem key={option}>{option}</ListItem>
      ))}
    </List>,
  );

  const listItems = screen.getAllByRole('listitem');

  expect(listItems).toHaveLength(options.length);

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const listItem = listItems[i];
    expect(listItem).toHaveTextContent(option);
  }
});

test('does not show a list when there are no list items', () => {
  customRender(<List />);

  const list = screen.queryByRole('list');
  expect(list).not.toBeInTheDocument();
});

test('shows default empty message when there are no list items', () => {
  customRender(<List />);

  const emptyMessage = screen.getByText('No results...');
  expect(emptyMessage).toBeInTheDocument();
});

test('shows given empty message when there are no list items', () => {
  customRender(<List emptyMessage="Custom empty list message" />);

  const emptyMessage = screen.getByText('Custom empty list message');
  expect(emptyMessage).toBeInTheDocument();
});
