import { Timestamp } from '@angular/fire/firestore';

export interface IEvent {
  city: string;
  name: string;
  time: Timestamp;
  venue: string;
  workshop: boolean;
  price: number;
  currency: string;
}
