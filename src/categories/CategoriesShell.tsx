import List from '@src/common/List';

type CategoriesShellProps = React.PropsWithChildren;

export default function CategoriesShell({ children }: CategoriesShellProps) {
  return <List className="grid lg:grid-cols-2 gap-4">{children}</List>;
}
