import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IEvent } from '../shared/interfaces/IEvent';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../shared/pipes/date.pipe';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../shared/components/button/button.component';
import { NewEventModalComponent } from './new-event-modal/new-event-modal.component';
import {
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    AngularFireModule,
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    MatDialogModule,
    ButtonComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  public events$ = new Observable<IEvent[]>();
  public eventForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit() {
    this.events$ = this.firestore
      .collection('events')
      .valueChanges() as Observable<IEvent[]>;
    // this.firestore.collection('events').add({
    //   city: "Prague",
    //   currency: "czk",
    //   name: "Bachata party",
    //   price: 200,
    //   time: 'May 23, 2024 at 6:00:00 PM UTC+2',
    //   venue: "Lavka",
    //   workshop: true
    // })
  }

  public openEventModal(): void {
    this.dialog.open(NewEventModalComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
