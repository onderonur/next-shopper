import { twMerge } from 'tailwind-merge';

type DescriptionListProps = {
  className?: string;
  children: React.ReactNode;
};

export function DescriptionList({ className, ...rest }: DescriptionListProps) {
  return (
    <dl
      // When `flex` is used, `break-words` does not work here,
      // even if `min-w-0` trick is used.
      // So, we use `grid` instead.
      className={twMerge('grid gap-2', className)}
      {...rest}
    />
  );
}

type DescriptionTermProps = {
  children: string;
};

export function DescriptionTerm({ children }: DescriptionTermProps) {
  return <dt className="font-bold text-muted-foreground">{children}</dt>;
}

type DescriptionDetailsProps = {
  className?: string;
  children: React.ReactNode;
};

export function DescriptionDetails(props: DescriptionDetailsProps) {
  return <dd {...props} />;
}
