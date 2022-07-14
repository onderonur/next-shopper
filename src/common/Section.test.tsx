import { customRender } from '@src/testing/TestingUtils';
import { screen, within } from '@testing-library/react';
import Section from './Section';

test('shows content with title', () => {
  customRender(
    <Section titleAs="h1" title="Some title">
      Some content
    </Section>,
  );

  const section = screen.getByLabelText('Some title');
  expect(section).toBeInTheDocument();

  const heading = within(section).getByRole('heading');
  expect(heading).toHaveTextContent('Some title');

  const content = within(section).getByTestId('section-content');
  expect(content).toHaveTextContent('Some content');
});

test('shows content with title and actions', () => {
  customRender(
    <Section titleAs="h2" title="Some title" headerActions="Some action">
      Some content
    </Section>,
  );

  const section = screen.getByLabelText('Some title');
  expect(section).toBeInTheDocument();

  const heading = within(section).getByRole('heading');
  expect(heading).toHaveTextContent('Some title');

  const content = within(section).getByTestId('section-content');
  expect(content).toHaveTextContent('Some content');

  const actions = within(section).getByTestId('section-actions');
  expect(actions).toHaveTextContent('Some action');
});

test('shows title with given level', () => {
  customRender(
    <div>
      <Section titleAs="h1" title="Level 1 title">
        First section
      </Section>
      <Section titleAs="h2" title="Level 2 title">
        Second section
      </Section>
    </div>,
  );

  const firstTitle = screen.getByRole('heading', { level: 1 });
  expect(firstTitle).toHaveTextContent('Level 1 title');

  const secondTitle = screen.getByRole('heading', { level: 2 });
  expect(secondTitle).toHaveTextContent('Level 2 title');
});

// TODO: hideTitle test edilebilir.
