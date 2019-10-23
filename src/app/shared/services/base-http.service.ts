import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class BaseHttpService {
  private queue = [];

  constructor(public http: HttpClient) {
  }

  getUrl(url: string) {
    return environment.host + url;
  }

  post(url: string, body: any, options: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), body, options).pipe(
      map(resp => {
        return resp;
      }),
      catchError(this.errorHandler('POST'))
    );
  }

  delete(url: string, options: any = {}): Observable<any> {
    return this.http.delete(this.getUrl(url), options).pipe(
      map(resp => resp),
      catchError(this.errorHandler('DELETE'))
    );
  }

  put(url: string, body: any, options: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), body, options).pipe(
      map(resp => resp),
      catchError(this.errorHandler('PUT'))
    );
  }

  get<T>(url: string, params?: any): Observable<any> {
    const options: any = {params: null};
    options.params = params;
    return this.http.get(this.getUrl(url), options).pipe(
      map(resp => resp),
      catchError(this.errorHandler('GET'))
    );
  }

  errorHandler(operation) {
    return (error: HttpErrorResponse) => {

      return throwError(error.error);
    };
  }

  postQueue(url, body) {
    const subscription = new Subject<any>();
    const request = {url, body, subscription};

    this.queue.push(request);
    if (this.queue.length === 1) {
      this.startNextRequest();
    }
    return subscription;
  }

  private startNextRequest() {
    if (this.queue.length > 0) {
      const requestData = this.queue[0];
      this.post(requestData.url, requestData.body).subscribe(res => {
        const sub = requestData.subscription;
        sub.next(res);
        this.queue.shift();

        // get next request, if any.
        this.startNextRequest();
      });
    }
  }

}
