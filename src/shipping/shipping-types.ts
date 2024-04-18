type City = {
  id: string;
  name: string;
};

type Region = {
  id: string;
  name: string;
  cities: City[];
};

export type Continent = {
  id: string;
  name: string;
  series: string;
  regions: Region[];
};
