import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {IUser} from '../../shared/interfaces/IUser.interface';
import {IUserLogged} from '../../shared/interfaces/IUserLogged.interface';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(public baseHttp: BaseHttpService) {
  }

  register(pack) {
    return this.baseHttp.post('/register', pack)
      .pipe(map(resp => resp as IUser));
  }

  login(pack) {
    return this.baseHttp.post('/login', pack)
      .pipe(map(resp => resp as IUserLogged));
  }
}
