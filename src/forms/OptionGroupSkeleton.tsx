import { createMockArray } from '@src/common/CommonUtils';
import List from '@src/common/List';
import ListItem from '@src/common/ListItem';
import OptionButtonSkeleton from './OptionButtonSkeleton';

function OptionGroupSkeleton() {
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

export default OptionGroupSkeleton;
