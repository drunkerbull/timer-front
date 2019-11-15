import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {IProject} from '../../../shared/interfaces/IProject.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {BaseComponent} from '../../../shared/components/base.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends BaseComponent implements OnInit {
  projects: IProject[] = [];
  openAddBox: boolean = false;
  options: any = {skip: 0, type: 'all'};

  form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(public projectsService: ProjectsService) {
    super();
  }

  ngOnInit() {
    this.getProjects();
  }

  changeType(type) {
    this.options = {...this.options, skip:0, type};
    this.projects = [];
    this.getProjects();
  }

  createProject() {
    const pack = this.form.value;
    this.loading = true;
    const subCreateProject = this.projectsService.createProject(pack).subscribe(res => {
      this.loading = false;
      this.projects.push(res);
      this.form.reset();
      this.openAddBox = false;
      this.toastr.info('Project  created');
    }, (err) => {
      this.loading = false;
      this.errorHandlingService.showError(err);
    });
    this.someSubscriptions.add(subCreateProject);
  }

  getProjects() {
    this.loading = true;
    const subGetProjects = this.projectsService.projects(this.options).subscribe(res => {
      this.loading = false;
      this.options.skip = this.options.skip + res.length;
      this.projects = [...this.projects, ...res];
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subGetProjects);
  }

}
