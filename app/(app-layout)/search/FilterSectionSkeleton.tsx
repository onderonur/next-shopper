import Panel from '@src/common/Panel';
import OptionGroupSkeleton from '@src/forms/OptionGroupSkeleton';

export default function FilterSectionSkeleton() {
  return (
    <>
      <Panel>
        <OptionGroupSkeleton />
      </Panel>
      <Panel>
        <OptionGroupSkeleton />
      </Panel>
      <Panel>
        <OptionGroupSkeleton />
      </Panel>
    </>
  );
}
