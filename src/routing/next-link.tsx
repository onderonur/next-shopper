import Link from 'next/link';

export type NextLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  isExternalUrl?: boolean;
};

export default function NextLink({ isExternalUrl, ...rest }: NextLinkProps) {
  return (
    <Link
      {...rest}
      target={isExternalUrl ? '_blank' : undefined}
      rel={isExternalUrl ? 'noopener noreferrer' : undefined}
      prefetch={false}
    />
  );
}
