import List from '@src/common/List';
import Paper from '@src/common/Paper';

type SearchResultsShellProps = React.PropsWithChildren;

export default function SearchResultsShell({
  children,
}: SearchResultsShellProps) {
  return (
    <Paper>
      <List className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
        {children}
      </List>
    </Paper>
  );
}
