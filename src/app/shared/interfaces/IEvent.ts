import { IPrice } from './IPrice';

export interface IEvent {
  event: IEventContents;
}
export interface IEventContents {
  name: string;
  country: string;
  city: string;
  date: string;
  venue: string;
  workshop: boolean;
  priceFull: IPrice;
}
