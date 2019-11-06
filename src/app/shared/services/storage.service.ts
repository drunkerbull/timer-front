import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {IUser} from '../interfaces/IUser.interface';
import {SocketService} from './socket.service';

@Injectable()
export class StorageService {
  static USER_INFO: string = 'timer-user';
  static USER_TOKEN: string = 'timer-token';
  static USER_REFRESH_TOKEN: string = 'timer-refresh-token';

  constructor(public router: Router) {
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  put(key: string, val: any) {
    localStorage.setItem(key, val);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  setToken(data) {
    this.put(StorageService.USER_TOKEN, data.token);
    this.put(StorageService.USER_REFRESH_TOKEN, data.refresh_token);
  }

  logout() {
    this.router.navigate(['/']);
    this.delete(StorageService.USER_REFRESH_TOKEN);
    this.delete(StorageService.USER_TOKEN);
    this.delete(StorageService.USER_INFO);
  }

  get userLogged() {
    return this.get(StorageService.USER_TOKEN);
  }
  get user(): IUser {
    return JSON.parse(this.get(StorageService.USER_INFO));
  }
}
