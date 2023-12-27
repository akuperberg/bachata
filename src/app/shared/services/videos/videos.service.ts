import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiKey = 'AIzaSyCOuBNs2WJZlMAe5LgRIkZLsGMVhmFgHK0';
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) { }

  public getVideoInfo(videoId: string): Observable<any> {
    const url = `${this.apiUrl}/videos?id=${videoId}&key=${this.apiKey}&part=snippet,contentDetails`;
    return this.http.get(url);
  }

  public getPopularVideos(): Observable<any>{

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', 'bachata tutorial')
      .set('type', 'video')
      .set('maxResults', '10')
      .set('order', 'viewCount')

    return this.http.get(`${this.apiUrl}/search`, { headers, params: params.set('key', this.apiKey) })
  }

}
