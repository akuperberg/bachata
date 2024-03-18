import { Timestamp } from '@angular/fire/firestore';
import { ICurrency } from './ICurrency';

export interface IEvent {
  city: string;
  name: string;
  time: Timestamp;
  venue: string;
  workshop: boolean;
  price: ICurrency;
}
