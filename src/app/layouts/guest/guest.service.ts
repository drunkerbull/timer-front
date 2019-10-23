import { Injectable } from '@angular/core';
import {BaseHttpService} from '../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {Res} from '../../shared/models/res.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(public baseHttp: BaseHttpService) { }

  register(pack){
    return this.baseHttp.post('/register', pack)
      .pipe(map(resp => resp as Res<any>));
  }
}
