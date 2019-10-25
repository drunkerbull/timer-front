import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {IProject} from '../../../shared/interfaces/IProject.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(public baseHttp: BaseHttpService) {
  }

  projects() {
    return this.baseHttp.get('/projects')
      .pipe(map(resp => resp as IProject[]));
  }

  createProject(pack) {
    return this.baseHttp.post('/projects', pack)
      .pipe(map(resp => resp as IProject));
  }

  getProject(id) {
    return this.baseHttp.get('/projects/' + id)
      .pipe(map(resp => resp as IProject));
  }

  getTasksOfProject(id) {
    return this.baseHttp.get('/projects/' + id + '/tasks')
      .pipe(map(resp => resp as any));
  }

  addTaskToProject(pack) {
    return this.baseHttp.post('/tasks', pack)
      .pipe(map(resp => resp as any));
  }

  updateTask(id, pack) {
    return this.baseHttp.put('/tasks/' + id , pack)
      .pipe(map(resp => resp as any));
  }
 deleteTask(id) {
    return this.baseHttp.delete('/tasks/' + id)
      .pipe(map(resp => resp as any));
  }
}
