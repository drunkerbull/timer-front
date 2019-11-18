import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorHandlingService {

  constructor(private toastr: ToastrService, public storageService: StorageService) {
  }

  showError(error) {
    console.log(error);
    this.toastr.error(error, 'Error request');
    if (error === 'Please authenticate. Not found User') {
      this.storageService.logout();
    }
  }

}
