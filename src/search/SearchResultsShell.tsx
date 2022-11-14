import List from '@src/common/List';
import Paper from '@src/common/Paper';

type SearchResultsShellProps = React.PropsWithChildren;

export default function SearchResultsShell({
  children,
}: SearchResultsShellProps) {
  return (
    <Paper>
      <List className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
        {children}
      </List>
    </Paper>
  );
}
