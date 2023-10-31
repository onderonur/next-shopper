import { createMockArray } from '@/common/common-utils';
import List from '@/common/list';
import ListItem from '@/common/list-item';
import OptionButtonSkeleton from './option-button-skeleton';

export default function OptionGroupSkeleton() {
  return (
    <List>
      {createMockArray(4).map((i) => {
        return (
          <ListItem key={i}>
            <OptionButtonSkeleton />
          </ListItem>
        );
      })}
    </List>
  );
}
