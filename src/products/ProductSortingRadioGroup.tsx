import RadioGroup from '@src/common/RadioGroup';
import { Maybe } from '@src/common/CommonTypes';
import { ProductSorting } from './ProductsTypes';
import { productSorting } from './ProductsUtils';

interface CategoriesRadioGroupProps {
  value: Maybe<string>;
  onChange: (value: Maybe<string>) => void;
}

const options = Object.values(productSorting);

function ProductSortingRadioGroup({
  value,
  onChange,
}: CategoriesRadioGroupProps) {
  return (
    <RadioGroup<ProductSorting, Maybe<string>>
      options={options}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      value={value}
      onChange={(newValue) => onChange(newValue)}
    />
  );
}

export default ProductSortingRadioGroup;
