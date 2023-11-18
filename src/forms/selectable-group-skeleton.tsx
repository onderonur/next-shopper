import { createMockArray } from '@/common/common-utils';
import { List, ListItem } from '@/common/list';

type SelectableGroupSkeletonProps = {
  optionCount: number;
};

export function SelectableGroupSkeleton({
  optionCount,
}: SelectableGroupSkeletonProps) {
  return (
    <List className="flex flex-col">
      {createMockArray(optionCount).map((i) => {
        return (
          <ListItem key={i}>
            <SelectableItemSkeleton />
          </ListItem>
        );
      })}
    </List>
  );
}

function SelectableItemSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center gap-2 py-1">
      <div className="h-8 w-8 flex-none rounded-md bg-skeleton" />
      <div className="h-8 flex-1 rounded-md bg-skeleton" />
    </div>
  );
}
