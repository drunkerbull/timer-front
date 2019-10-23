import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class StorageService {
  static USER_TOKEN: string = 'timer-token';

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

  logout() {
    this.delete(StorageService.USER_TOKEN);
    this.router.navigate(['/user']);
  }

  get userLogged() {
    return this.get(StorageService.USER_TOKEN);
  }

}
