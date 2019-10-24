import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {Project} from '../../../shared/interfaces/project.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {BaseComponent} from '../../../shared/components/base.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends BaseComponent implements OnInit {
  projects: Project[];
  openAddBox: boolean = false;
  form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(public projectsService: ProjectsService) {
    super();
  }

  ngOnInit() {
    this.getProjects();
  }

  projectOwner(id) {
    return id === this.storageService.user._id
  }

  createProject() {
    const pack = this.form.value;
    const subCreateProject = this.projectsService.createProject(pack).subscribe(res => {
      this.projects.push(res);
      this.form.reset();
      this.openAddBox = false;
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subCreateProject);
  }

  getProjects() {
    const subGetProjects = this.projectsService.projects().subscribe(res => {
      this.projects = res;
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subGetProjects);
  }
}
