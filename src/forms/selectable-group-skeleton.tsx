import { createMockArray } from '@/common/common-utils';
import { List, ListItem } from '@/common/list';

type SelectableGroupSkeletonProps = {
  optionCount: number;
};

export function SelectableGroupSkeleton({
  optionCount,
}: SelectableGroupSkeletonProps) {
  return (
    <List className="flex flex-col gap-1">
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
    <div className="flex w-full animate-pulse items-center gap-1 py-1">
      <div className="h-7 w-7 flex-none rounded-md bg-skeleton" />
      <div className="h-7 flex-1 rounded-md bg-skeleton" />
    </div>
  );
}
