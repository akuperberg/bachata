export interface ICurrencies {
  data: ICurrency[];
  error: boolean;
  msg: string;
}

export interface ICurrency {
  currency: string;
  iso2: string;
  iso3: string;
  name: string;
}
