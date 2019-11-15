import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../shared/services/base-http.service';
import {map} from 'rxjs/operators';
import {IProject} from '../../../shared/interfaces/IProject.interface';
import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  timerTimeout = interval(1000);

  constructor(public baseHttp: BaseHttpService) {
  }

  projects(options) {
    let query = '';
    if (options) {
      query = '?';
      for (let item in options) {
        query = query + item + '=' + options[item] + '&';
      }
    }
    return this.baseHttp.get('/projects' + query)
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

  updateProject(id, pack) {
    return this.baseHttp.put('/projects/' + id, pack)
      .pipe(map(resp => resp as any));
  }

  deleteProject(id) {
    return this.baseHttp.delete('/projects/' + id)
      .pipe(map(resp => resp as any));
  }

  updateTask(id, pack) {
    return this.baseHttp.put('/tasks/' + id, pack)
      .pipe(map(resp => resp as any));
  }

  deleteTask(id) {
    return this.baseHttp.delete('/tasks/' + id)
      .pipe(map(resp => resp as any));
  }

  addWorker(id, pack) {
    return this.baseHttp.post('/projects/' + id + '/worker', pack)
      .pipe(map(resp => resp as any));
  }

  deleteWorker(id, pack) {
    return this.baseHttp.delete('/projects/' + id + '/worker/' + pack._id)
      .pipe(map(resp => resp as any));
  }

  toggleUserTimer(task) {
    return this.baseHttp.post('/users/me/timer', task)
      .pipe(map(resp => resp as any));

  }
}
