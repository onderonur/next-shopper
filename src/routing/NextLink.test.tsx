import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import NextLink from './NextLink';

test('has required attributes when it is an external URL', () => {
  customRender(
    <div>
      <NextLink href="/some-internal-path">Internal link</NextLink>
      <NextLink href="https://some-external-url" isExternalUrl>
        External link
      </NextLink>
    </div>,
  );

  const internalLink = screen.getByRole('link', { name: 'Internal link' });
  expect(internalLink).not.toHaveAttribute('target', '_blank');
  expect(internalLink).not.toHaveAttribute('rel', 'noopener noreferrer');

  const externalLink = screen.getByRole('link', { name: 'External link' });
  expect(externalLink).toHaveAttribute('target', '_blank');
  expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
});
