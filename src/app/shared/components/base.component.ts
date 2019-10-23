import {OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseHttpService} from '../services/base-http.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {AppInjector} from '../services/app-injector.service';
import {ErrorHandlingService} from '../services/error-handling.service';

export class BaseComponent implements OnDestroy {
  router: Router;
  storageService: StorageService;
  baseHttp: BaseHttpService;
  someSubscriptions: Subscription = new Subscription();
  route: ActivatedRoute;
  errorHandlingService: ErrorHandlingService;

  constructor() {
    const injector = AppInjector.getInjector();
    this.router = injector.get(Router);
    this.storageService = injector.get(StorageService);
    this.baseHttp = injector.get(BaseHttpService);
    this.route = injector.get(ActivatedRoute);
    this.errorHandlingService = injector.get(ErrorHandlingService);
  }

  ngOnDestroy() {
    this.someSubscriptions.unsubscribe();
  }
}
