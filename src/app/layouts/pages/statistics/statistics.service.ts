import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {ITasks} from '../../../shared/interfaces/ITasks.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(public baseHttp: BaseHttpService) {
  }

  getStats(type, queries) {
    return this.baseHttp.get('/statistics/' + type + '/' + queries)
      .pipe(map(resp => resp as ITasks[]));
  }

}
