import Paper from '@src/common/Paper';
import OptionGroupSkeleton from '@src/forms/OptionGroupSkeleton';

// TODO: Panel title skeleton ekle
export default function FilterSectionSkeleton() {
  return (
    <>
      <Paper>
        <OptionGroupSkeleton />
      </Paper>
      <Paper>
        <OptionGroupSkeleton />
      </Paper>
      <Paper>
        <OptionGroupSkeleton />
      </Paper>
    </>
  );
}
