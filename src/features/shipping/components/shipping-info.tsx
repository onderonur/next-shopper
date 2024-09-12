import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/core/ui/components/description-list';

type ShippingInfoProps = {
  continentName: string;
  regionName: string;
  cityName: string;
};

export function ShippingInfo({
  continentName,
  regionName,
  cityName,
}: ShippingInfoProps) {
  return (
    <DescriptionList>
      <div>
        <DescriptionTerm>Continent</DescriptionTerm>
        <DescriptionDetails>{continentName}</DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Region</DescriptionTerm>
        <DescriptionDetails>{regionName}</DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>City</DescriptionTerm>
        <DescriptionDetails>{cityName}</DescriptionDetails>
      </div>
    </DescriptionList>
  );
}
