import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class StorageService {
  static USER_TOKEN: string = 'timer-token';
  static USER_REFRESH_TOKEN: string = 'timer-token';
  _

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
  setToken(data){
    this.put(StorageService.USER_TOKEN, data.token);
    this.put(StorageService.USER_REFRESH_TOKEN, data.refresh_token);
  }
  logout() {
    this.delete(StorageService.USER_TOKEN);
    setTimeout(() => {
      this.router.navigate(['/']);
    });
  }

  get userLogged() {
    return this.get(StorageService.USER_TOKEN);
  }

}
