import {Injectable} from '@angular/core';

@Injectable()
export class ErrorHandlingService {

  constructor() {
  }

  showError(error){
    console.log('ERROR:', error)
  }

}
