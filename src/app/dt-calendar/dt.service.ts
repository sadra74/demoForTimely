import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DtService {

  public calendarSettings: any;
  public eventsList: any;
  public taxonomiesList: any;

  constructor(public http: HttpClient) {
  }


  getCalendarSettings(): Observable<any> {
    return this.http.post<any>('https://timelyapp.time.ly/api/calendars/info', {url: 'https://calendar.time.ly/ficceyp4'});
  }

  getEventsList(calendarId: number, parameters = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(parameters).forEach(key => {
      if (parameters[key]) {
        params = params.set(key, parameters[key].toString());
      }
    });
    return this.http.get<any>('https://timelyapp.time.ly/api/calendars/' + calendarId + '/events', {params});
  }

  getTaxonomiesList(calendarId: number): Observable<any> {
    return this.http.get<any>('https://timelyapp.time.ly/api/calendars/' + calendarId + '/taxonomies');
  }

  getMoreFilters(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


}
