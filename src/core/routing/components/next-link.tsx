import Link from 'next/link';

export type NextLinkProps = React.ComponentProps<typeof Link>;

export function NextLink({ href, ...rest }: NextLinkProps) {
  let { target, rel } = rest;

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const hrefString = href.toString();

  if (!hrefString.startsWith('/')) {
    // Adding `target` and `rel` to external links.
    target = '_blank';
    rel = 'noopener noreferrer';
  }

  return (
    <Link
      {...rest}
      href={hrefString}
      target={target}
      rel={rel}
      prefetch={false}
    />
  );
}
