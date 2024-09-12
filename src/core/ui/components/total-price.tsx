import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/core/ui/components/description-list';
import { Price } from '@/core/ui/components/price';

type TotalPriceProps = {
  className?: string;
  value: number;
};

export function TotalPrice({ className, value }: TotalPriceProps) {
  if (!value) return null;

  return (
    <DescriptionList className={className}>
      <div className="flex justify-between text-lg font-bold">
        <DescriptionTerm>Total</DescriptionTerm>
        <DescriptionDetails>
          <Price value={value} />
        </DescriptionDetails>
      </div>
    </DescriptionList>
  );
}
