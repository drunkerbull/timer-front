import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public storageService: StorageService) {
  }

  canActivate(): boolean {
    if (!this.storageService.get(StorageService.USER_TOKEN)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
