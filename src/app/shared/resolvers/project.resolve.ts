import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {IProject} from '../interfaces/IProject.interface';
import {ProjectsService} from '../../layouts/pages/projects/projects.service';
import {BaseComponent} from '../components/base.component';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectResolve extends BaseComponent implements Resolve<IProject> {

  constructor(public projectsService: ProjectsService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('project');
    if (!id) {
      const error = {message: 'not_found'};
      return this.errorHandle(error);
    }
    return this.projectsService.getProject(id).pipe(
      catchError(error => {
        return this.errorHandle(error);
      })
    );
  }

  errorHandle(error: any) {
    this.router.navigate(['/projects']);
    return of({data: null, error: error.message});
  }
}
