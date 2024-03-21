export interface ICountries {
  data: ICountry[];
  error: boolean;
  msg: string;
}

export interface ICountry {
  cities: string[];
  country: string;
  iso2: string;
  iso3: string;
}
