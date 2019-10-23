import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from './storage.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  refreshInProgress: boolean = false;
  tokenTurnSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public loadingEmitter: any = new Subject<string>();

  constructor(public storageService: StorageService, public router: Router, public route: ActivatedRoute,
              public http: HttpClient) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let formatUrl = {url: req.url};
    if (this.storageService.get(StorageService.USER_TOKEN)) {
      formatUrl = Object.assign(formatUrl,
        {setHeaders: {Authorization: 'Bearer ' + this.storageService.get(StorageService.USER_TOKEN)}});
    }
    req = req.clone(formatUrl);

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      switch (err.error.message) {
        case 'unauthorized': {
         console.log('unauthorized!!!!!!!!!!!!!!!!!!!!!!!!!')
          break;
        }
        case 'expired_jwt_token': {
          this.storageService.delete(StorageService.USER_TOKEN);
          return !this.refreshInProgress ? this.refreshToken(req, next) : this.tokenTurnContinue(req, next);
        }
        default: {
          return throwError(err);
        }
      }
    }));
  }

  refreshToken(req: HttpRequest<any>, next: HttpHandler) {
    this.tokenTurnSubject.next(null);
    this.refreshInProgress = true;
    return this.http.post(environment.host + '/token/refresh', {
      refresh_token: this.storageService.get(StorageService.USER_REFRESH_TOKEN)
    })
      .pipe(switchMap((data:any) => {
        this.storageService.setToken(data);
        this.refreshInProgress = false;
        this.tokenTurnSubject.next(data.token);
        req = req.clone({setHeaders: {Authorization: 'Bearer ' + this.storageService.get(StorageService.USER_TOKEN)}});
        return next.handle(req);
      }));
  }

  tokenTurnContinue(req: HttpRequest<any>, next: HttpHandler) {
    return this.tokenTurnSubject   // wait on stream event
      .pipe(filter(token => token != null), take(1),
        switchMap(() => {
          req = req.clone({setHeaders: {Authorization: 'Bearer ' + this.storageService.get(StorageService.USER_TOKEN)}});
          return next.handle(req);
        }));
  }

}


