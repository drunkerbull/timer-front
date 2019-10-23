import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  static USER_TOKEN: string = 'timer-token';

  constructor() {
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
  }


}
