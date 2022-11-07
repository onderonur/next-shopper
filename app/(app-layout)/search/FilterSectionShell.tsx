type FilterSectionShellProps = React.PropsWithChildren;

export default function FilterSectionShell({
  children,
}: FilterSectionShellProps) {
  return <div className="pb-6 flex flex-col gap-4">{children}</div>;
}
