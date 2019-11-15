import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {ITasks} from '../../../shared/interfaces/ITasks.interface';
import {IUser} from '../../../shared/interfaces/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(public baseHttp: BaseHttpService) {
  }

  getStatsWorker(queries) {
    return this.baseHttp.get('/statistics/worker' + queries)
      .pipe(map(resp => resp as ITasks[]));
  }

  getStatsOwner(queries) {
    return this.baseHttp.get('/statistics/owner' + queries)
      .pipe(map(resp => resp as ITasks[]));
  }
  getStatsOwnerProject(queries) {
    return this.baseHttp.get('/statistics/owner-project' + queries)
      .pipe(map(resp => resp as ITasks[]));
  }
}
