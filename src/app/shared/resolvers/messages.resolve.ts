import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BaseComponent} from '../components/base.component';
import {of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagesResolve extends BaseComponent implements Resolve<any> {

  constructor() {
    super();
  }

  resolve(route: ActivatedRouteSnapshot): any {
    const room = route.paramMap.get('room');
    if (!room) {
      const error = {message: 'not_found'};
      return this.errorHandle(error);
    }
    return room;
  }

  errorHandle(error: any) {
    this.router.navigate(['/projects']);
    return of({data: null, error: error.message});
  }
}
