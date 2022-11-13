import { createMockArray } from '@src/common/CommonUtils';
import Paper from '@src/common/Paper';
import PaperTitle from '@src/common/PaperTitle';
import OptionGroupSkeleton from '@src/forms/OptionGroupSkeleton';

export default function FilterSectionSkeleton() {
  return (
    <>
      {createMockArray(3).map((i) => {
        return (
          <div key={i}>
            <PaperTitle isLoading />
            <Paper>
              <OptionGroupSkeleton />
            </Paper>
          </div>
        );
      })}
    </>
  );
}
