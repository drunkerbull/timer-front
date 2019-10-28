import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {IProject} from '../../../shared/interfaces/IProject.interface';
import {ITasks} from '../../../shared/interfaces/ITasks.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(public baseHttp: BaseHttpService) {
  }

  getStats(queries) {
    return this.baseHttp.get('/statistics'+queries)
      .pipe(map(resp => resp as ITasks[]));
  }
}
