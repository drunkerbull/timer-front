import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {Project} from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];

  constructor(public projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.getProjects();
  }

  createRandomProject() {
    const pack = {name: 'superProjectNumber-' + Math.random()};
    this.projectsService.createProject(pack).subscribe(res => {
      this.projects.push(res);
    });
  }

  getProjects() {
    this.projectsService.projects().subscribe(res => {
      this.projects = res;
    });
  }
}
