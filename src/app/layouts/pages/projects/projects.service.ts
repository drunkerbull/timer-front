import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {Project} from '../../../shared/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(public baseHttp: BaseHttpService) {
  }

  projects() {
    return this.baseHttp.get('/projects')
      .pipe(map(resp => resp as Project[]));
  }

  createProject(pack) {
    return this.baseHttp.post('/projects', pack)
      .pipe(map(resp => resp as Project));
  }

  getProject(id) {
    return this.baseHttp.get('/projects/' + id)
      .pipe(map(resp => resp as Project));
  }
  getTasksOfProject(id){
    return this.baseHttp.get('/projects/' + id + '/tasks')
      .pipe(map(resp => resp as any));
  }

  addTaskToProject(pack){
    return this.baseHttp.post('/tasks',pack)
      .pipe(map(resp => resp as any));
  }
}
