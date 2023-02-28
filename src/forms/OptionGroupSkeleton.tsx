import { createMockArray } from '@/common/CommonUtils';
import List from '@/common/List';
import ListItem from '@/common/ListItem';
import OptionButtonSkeleton from './OptionButtonSkeleton';

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
