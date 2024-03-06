import { Timestamp } from '@angular/fire/firestore';

export interface IEvent {
  capacity: number;
  city: string;
  name: string;
  time: Timestamp;
  venue: string;
  workshop: boolean;
}
