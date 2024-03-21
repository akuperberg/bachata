import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { NewEventService } from '../../shared/services/new-event/new-event.service';
import { ICurrencies } from '../../shared/interfaces/ICurrencies';
import { Observable } from 'rxjs';
import { ICountries } from '../../shared/interfaces/ICountries';


@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MtxDatetimepickerModule
  ],
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.scss',
})
export class NewEventComponent {
  public eventForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    date: new FormControl(''),
    venue: new FormControl(''),
    workshop: new FormControl(''),
    price: new FormControl(''),
  });
  public currencies$ = new Observable<ICurrencies[]>();
  public countries$ = new Observable<ICountries[]>();

  constructor(private newEventService: NewEventService) {}

  ngOnInit() {
    // this.firestore.collection('events').add({
    //   city: "Prague",
    //   currency: "czk",
    //   name: "Bachata party",
    //   price: 200,
    //   time: 'May 23, 2024 at 6:00:00 PM UTC+2',
    //   venue: "Lavka",
    //   workshop: true
    // })

    this.newEventService.getCountries().subscribe(item => console.log(item))
    this.newEventService.getCurrencies().subscribe(item => console.log(item))
    this.newEventService.getCities('Congo').subscribe(item => console.log(item))
  }
}
