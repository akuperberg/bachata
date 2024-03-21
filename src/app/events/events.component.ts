import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from '../shared/interfaces/IEvent';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../shared/pipes/date.pipe';
import { ButtonComponent } from '../shared/components/button/button.component';
import { FirebaseService } from '../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ButtonComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  public events$ = new Observable<IEvent[]>();

  constructor(private firebase: FirebaseService) {}

  ngOnInit() {
    this.events$ = this.firebase.getValueChanges('events');
  }
}
