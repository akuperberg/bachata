import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiKey = 'AIzaSyCOuBNs2WJZlMAe5LgRIkZLsGMVhmFgHK0';

  constructor(private http: HttpClient) { }

  getVideoInfo(videoId: string): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${this.apiKey}&part=snippet,contentDetails`;
    return this.http.get(url);
  }

}
