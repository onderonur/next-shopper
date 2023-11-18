import { createMockArray } from '@/common/common-utils';
import List from '@/common/list';
import ListItem from '@/common/list-item';
import SelectableItemSkeleton from './selectable-item-skeleton';

type SelectableGroupSkeletonProps = {
  optionCount: number;
};

export default function SelectableGroupSkeleton({
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
