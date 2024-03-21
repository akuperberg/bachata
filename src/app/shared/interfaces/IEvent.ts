import { Timestamp } from '@angular/fire/firestore';
import { IPrice } from './IPrice';

export interface IEvent {
  name: string;
  city: string;
  time: Timestamp;
  venue: string;
  workshop: boolean;
  priceFull: IPrice;
}
