import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {Project} from '../../../../../shared/interfaces/project.interface';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../../projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent extends BaseComponent implements OnInit {
  project: Project;
  loading: boolean = false;

  constructor(public activatedRoute: ActivatedRoute, public projectsService: ProjectsService) {
    super();
  }

  addTask() {
    this.loading = true;
    const pack = {
      name: 'testTaskOKCreate ' + Math.random(),
      project: this.project._id
    };
    const subDataAddTask = this.projectsService.addTaskToProject(pack).subscribe((task: any) => {
      this.project.tasks.push(task);
      this.loading = false;
    });
    this.someSubscriptions.add(subDataAddTask);
  }

  ngOnInit() {
    const subData = this.activatedRoute.data.subscribe((project: { project: Project }) => {
      this.project = project.project;
      this.loading = true;
      const subDataTasks = this.projectsService.getTasksOfProject(this.project._id).subscribe((tasks: any) => {
        this.project.tasks = tasks;
        this.loading = false;
      });
      this.someSubscriptions.add(subDataTasks);
    });
    this.someSubscriptions.add(subData);
  }

}
