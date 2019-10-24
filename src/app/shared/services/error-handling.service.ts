import {Injectable} from '@angular/core';
import {BaseComponent} from '../components/base.component';
import {StorageService} from './storage.service';

@Injectable()
export class ErrorHandlingService  {

  constructor(public storageService: StorageService) {
  }

  showError(error) {
    console.log('ERROR:', error);
    if (error.error === 'Error: Please authenticate. Not found User') {
      this.storageService.logout();
    }
  }

}
