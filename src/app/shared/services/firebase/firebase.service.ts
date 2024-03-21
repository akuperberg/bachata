import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IEvent } from '../../interfaces/IEvent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public events = new Observable<IEvent[]>();
  constructor(private firestore: AngularFirestore) {}

  public getValueChanges(value: string): Observable<IEvent[]> {
    return this.firestore.collection(value).valueChanges() as Observable<
      IEvent[]
    >;
  }

  public pushNewEvent(collection: string, event: IEvent) {
    this.firestore.collection(collection).add({
      event,
    });
  }
}
