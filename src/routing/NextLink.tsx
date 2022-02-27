import Link, { LinkProps } from 'next/link';

export type NextLinkProps = React.PropsWithChildren<
  LinkProps & {
    className?: string;
    isExternalUrl?: boolean;
    'aria-label'?: string;
  }
>;

function NextLink({
  passHref = true,
  className,
  isExternalUrl,
  children,
  ...rest
}: NextLinkProps) {
  return (
    <Link {...rest} passHref={passHref}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className={className}
        target={isExternalUrl ? '_blank' : undefined}
        rel={isExternalUrl ? 'noopener noreferrer' : undefined}
        aria-label={rest['aria-label']}
      >
        {children}
      </a>
    </Link>
  );
}

export default NextLink;
