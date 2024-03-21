import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICountries } from '../../interfaces/ICountries';
import { ICurrencies } from '../../interfaces/ICurrencies';
import { Observable } from 'rxjs';
import { ICities } from '../../interfaces/ICities';

@Injectable({
  providedIn: 'root',
})
export class NewEventService {
  private apiUrl = 'https://countriesnow.space/api/v0.1';
  constructor(private http: HttpClient) {}

  public getCountries(): Observable<ICountries> {
    return this.http.get(`${this.apiUrl}/countries`) as Observable<ICountries>;
  }

  public getCurrencies(): Observable<ICurrencies> {
    return this.http.get(
      `${this.apiUrl}/countries/currency`
    ) as Observable<ICurrencies>;
  }

  public getCities(country: string): Observable<ICities> {
    const url = `${this.apiUrl}/countries/cities`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      country: country,
    };

    return this.http.post(url, body, { headers: headers, responseType: 'json' }) as Observable<ICities>;
  }
}
