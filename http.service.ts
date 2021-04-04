import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigUpload} from './models/ConfigUpload';
import {ConfigEdit} from './models/ConfigEdit';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public BASE_URL = 'https://api.sm.craftedcrime.de';

  constructor(private http: HttpClient) {
  }

  // --------------------- STATS --------------------- //


  // --------------------- WEB EDITOR --------------------- //

  public downloadConfigUpload(key: string, secret: string): Observable<HttpResponse<ConfigUpload>> {
    return this.http.get<ConfigUpload>(this.BASE_URL + '/download?key=' + key + '&secret=' + secret, {
      headers: this.getOptions(),
      observe: 'response',
      responseType: 'json'
    });
  }

  public downloadConfigEdit(key: string, secret: string): Observable<HttpResponse<ConfigEdit>> {
    return this.http.get<ConfigEdit>(this.BASE_URL + '/edit/get?key=' + key + '&secret=' + secret, {
      headers: this.getOptions(),
      observe: 'response',
      responseType: 'json'
    });
  }

  public saveConfigUpload(key: string, secret: string, configupl: ConfigEdit): Observable<HttpResponse<number>> {
    console.log('key: ' + key + ', secret: ' + secret);
    return this.http.post<number>(this.BASE_URL + '/edit/save?key=' + key + '&secret=' + secret, configupl, {
      headers: this.getOptions(),
      observe: 'response',
      responseType: 'json'
    });
  }


  private getOptions(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


}
