import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {IProject} from '../../../../../shared/interfaces/IProject.interface';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../../projects.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent extends BaseComponent implements OnInit {
  project: IProject;
  loading: boolean = false;
  openAddBox: boolean = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
  });
  currentTimer: any = null;

  constructor(public activatedRoute: ActivatedRoute, public projectsService: ProjectsService) {
    super();
  }


  addTask() {
    this.loading = true;
    const pack = {
      ...this.form.value,
      project: this.project._id
    };
    const subDataAddTask = this.projectsService.addTaskToProject(pack).subscribe((task: any) => {
      task.owner = this.storageService.user;
      this.project.tasks.unshift(task);
      this.loading = false;
    });
    this.someSubscriptions.add(subDataAddTask);
  }

  ngOnInit() {
    const subData = this.activatedRoute.data.subscribe((project: { project: IProject }) => {
      this.project = project.project;
      this.loading = true;
      const subDataTasks = this.projectsService.getTasksOfProject(this.project._id).subscribe((tasks: any) => {
        this.project.tasks = tasks.reverse();
        for(let i = 0; i < this.project.tasks.length; i++){
          const task =  this.project.tasks[i];
          const lastTimer = task.timers[task.timers.length - 1];
          if (!lastTimer.end) {
            const {start} = lastTimer;
            this.currentTimer = {
              start,
              taskIndex: i,
              index: task.timers.length - 1,
              end: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            break
          }
        }
        this.loading = false;
      });
      this.someSubscriptions.add(subDataTasks);
    });
    this.someSubscriptions.add(subData);
  }


  timer() {

  }

  startTimer(taskId,index) {
    this.currentTimer = {
      start: moment().format('YYYY-MM-DD HH:mm:ss'),
      index: null,
      taskIndex: index,
      end: null
    };
    this.projectsService.startTimer(taskId, this.currentTimer).subscribe((task) => {
      this.project.tasks[index] = task
    });
  }

  stopTimer(taskId, index) {
    const timers = this.project.tasks[index].timers;
    if (!this.currentTimer) {
      const lastTimer = timers[timers.length - 1];
      if (!lastTimer.end) {
        const {start} = lastTimer;
        this.currentTimer = {
          start,
          taskIndex: index,
          index: timers.length - 1,
          end: moment().format('YYYY-MM-DD HH:mm:ss')
        };
      }
    } else {
      this.currentTimer.index = timers.length > 0 ? timers.length - 1 : 0;
      this.currentTimer.end = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    this.projectsService.stopTimer(taskId, this.currentTimer).subscribe((task) => {
      console.log('this task with start and stop timer');
      this.project.tasks[index] = task
      this.currentTimer = null
    });
  }
}
