import { Maybe } from '@src/common/CommonTypes';
import { Category } from './CategoriesTypes';
import { useQuery } from 'react-query';
import { categoriesAPI } from './categoriesAPI';
import RadioGroup from '@src/forms/RadioGroup';

interface CategoriesRadioGroupProps {
  value: Maybe<string>;
  onChange: (value: Maybe<string>) => void;
}

function CategoriesRadioGroup({ value, onChange }: CategoriesRadioGroupProps) {
  const { data, isLoading } = useQuery(categoriesAPI.fetchManyCategories());

  return (
    <RadioGroup<Category, Maybe<string>>
      isLoading={isLoading}
      options={[{ name: 'all', image: '' }, ...(data ?? [])]}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) =>
        option.name === 'all' ? undefined : option.name
      }
      value={value}
      onChange={(newValue) => onChange(newValue)}
    />
  );
}

export default CategoriesRadioGroup;
