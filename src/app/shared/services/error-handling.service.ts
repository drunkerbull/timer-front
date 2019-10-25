import {Injectable} from '@angular/core';
import {BaseComponent} from '../components/base.component';
import {StorageService} from './storage.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorHandlingService  {

  constructor(private toastr: ToastrService, public storageService: StorageService) {
  }

  showError(error) {
    this.toastr.error(error.error, 'Error request');
    if (error.error === 'Error: Please authenticate. Not found User') {
      this.storageService.logout();
    }
  }

}
