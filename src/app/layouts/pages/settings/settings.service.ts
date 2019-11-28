import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {IUser} from '../../../shared/interfaces/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(public baseHttp: BaseHttpService) {
  }

  getMainData() {
    return this.baseHttp.get('/users/me')
      .pipe(map(resp => resp as IUser));
  }
  getStatisticsData() {
    return this.baseHttp.get('/statistics/me')
      .pipe(map(resp => resp as any));
  }
  updateMainData(pack) {
    return this.baseHttp.put('/users/me', pack)
      .pipe(map(resp => resp as IUser));
  }

  updatePassData(pack) {
    return this.baseHttp.put('/users/me/pass', pack)
      .pipe(map(resp => resp as IUser));
  }

  deleteMainData() {
    return this.baseHttp.delete('/users/me')
      .pipe(map(resp => resp as { message: string }));
  }

  updateAvatarData(pack) {
    return this.baseHttp.post('/users/me/avatar', pack)
      .pipe(map(resp => resp as any));
  }

  getBlackList() {
    return this.baseHttp.get('/blacklist')
      .pipe(map(resp => resp as IUser));
  }

  addBlackList(nickname: string) {
    return this.baseHttp.post('/blacklist', {nickname})
      .pipe(map(resp => resp as IUser));
  }

  deleteBlackList(id: string) {
    return this.baseHttp.delete('/blacklist/' + id)
      .pipe(map(resp => resp as { message: string }));
  }
}
