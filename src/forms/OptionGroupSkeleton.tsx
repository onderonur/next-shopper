import { createMockArray } from '@src/common/CommonUtils';
import List from '@src/common/List';
import ListItem from '@src/common/ListItem';
import OptionButtonSkeleton from './OptionButtonSkeleton';

function OptionGroupSkeleton() {
  return (
    <div data-testid="option-group-skeleton">
      <List>
        {createMockArray(4).map((i) => {
          return (
            <ListItem key={i}>
              <OptionButtonSkeleton />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default OptionGroupSkeleton;
