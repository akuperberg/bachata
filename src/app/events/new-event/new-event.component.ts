import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { NewEventService } from '../../shared/services/new-event/new-event.service';
import { ICurrencies } from '../../shared/interfaces/ICurrencies';
import { filter, map, Observable, switchMap } from 'rxjs';
import { ICountries } from '../../shared/interfaces/ICountries';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MtxDatetimepickerModule,
    CommonModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.scss',
})
export class NewEventComponent {
  public currencies$ = new Observable<ICurrencies>();
  public countries$ = new Observable<ICountries>();
  public cities = [''];

  public eventForm = new FormGroup({
    name: new FormControl('',  Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    venue: new FormControl('', Validators.required),
    workshop: new FormControl('', Validators.required),
    priceFull: new FormGroup({
      price: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
    })
  });

  constructor(private newEventService: NewEventService, private firebase: FirebaseService) {}

  ngOnInit() {

    this.countries$ = this.newEventService.getCountries();
    this.currencies$ = this.newEventService.getCurrencies();

    this.eventForm
      .get('country')
      ?.valueChanges.pipe(
        map((selectedCountry: string | null) =>
          selectedCountry ? selectedCountry : ''
        ),
        switchMap((selectedCountry: string) => {
          return this.newEventService.getCities(selectedCountry);
        })
      )
      .subscribe((cities) => {
        this.cities = cities.data;
      });
  }

  onFormSubmit() {
    console.log(this.eventForm.value);
      this.firebase.pushNewEvent('events', this.eventForm.value)
    }
}
