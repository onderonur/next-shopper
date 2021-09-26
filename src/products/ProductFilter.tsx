import CategoriesRadioGroup from '@src/categories/CategoriesRadioGroup';
import { Maybe } from '@src/common/CommonTypes';
import Panel from '@src/common/Panel';
import ProductSortingRadioGroup from './ProductSortingRadioGroup';

type ProductFilterValues = { category: Maybe<string>; sorting: Maybe<string> };

interface ProductFilterProps {
  values: ProductFilterValues;
  onChange: (values: ProductFilterValues) => void;
}

function ProductFilter({ values, onChange }: ProductFilterProps) {
  return (
    <div className="flex flex-col gap-4">
      <Panel title="Category">
        <CategoriesRadioGroup
          value={values.category}
          onChange={(newCategory) =>
            onChange({ ...values, category: newCategory })
          }
        />
      </Panel>
      <Panel title="Sorting">
        <ProductSortingRadioGroup
          value={values.sorting}
          onChange={(newSorting) =>
            onChange({ ...values, sorting: newSorting })
          }
        />
      </Panel>
    </div>
  );
}

export default ProductFilter;
