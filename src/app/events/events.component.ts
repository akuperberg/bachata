import { Component } from '@angular/core';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IEvent } from '../shared/interfaces/IEvent';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../shared/pipes/date.pipe';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [AngularFireModule, CommonModule, DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  public events$ = new Observable<IEvent[]>;

  constructor(
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
  this.events$ = this.firestore.collection('events').valueChanges() as Observable<IEvent[]>;
  // this.firestore.collection('users').add({
  //   name: 'John Doe',
  // })
  // console.log(this.events.subscribe(event => console.log(event)));
  }

}
