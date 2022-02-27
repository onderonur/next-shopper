import RadioGroup from '@src/common/RadioGroup';
import { Maybe } from '@src/common/CommonTypes';
import { Category } from './CategoriesTypes';
import { useQuery } from 'react-query';
import { categoriesAPI } from './categoriesAPI';

interface CategoriesRadioGroupProps {
  value: Maybe<string>;
  onChange: (value: Maybe<string>) => void;
}

function CategoriesRadioGroup({ value, onChange }: CategoriesRadioGroupProps) {
  const { data, isLoading } = useQuery(categoriesAPI.fetchManyCategories());

  return (
    <RadioGroup<Maybe<Category>, Maybe<string>>
      isLoading={isLoading}
      options={[undefined, ...(data ?? [])]}
      getOptionLabel={(option) => (option ? option.name : 'all')}
      getOptionValue={(option) => option?.name ?? undefined}
      value={value}
      onChange={(newValue) => onChange(newValue)}
    />
  );
}

export default CategoriesRadioGroup;
