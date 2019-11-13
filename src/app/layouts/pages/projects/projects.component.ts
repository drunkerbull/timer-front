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
  countProjects: number = 0;
  countOwner: number = 0;

  form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(public projectsService: ProjectsService) {
    super();
  }

  ngOnInit() {
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
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subCreateProject);
  }

  getProjects() {
    this.loading = true;
    const subGetProjects = this.projectsService.projects().subscribe(res => {
      this.loading = false;
      this.countProjects = res.length;
      res.map((project) => {
        if (project.owner._id === this.storageService.user._id) {
          this.countOwner++;
        }
      });
      this.projects = res.reverse();
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subGetProjects);
  }
}
