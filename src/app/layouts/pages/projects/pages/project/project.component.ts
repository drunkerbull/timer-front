import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {IProject} from '../../../../../shared/interfaces/IProject.interface';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../../projects.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import * as momentFormat from 'moment-duration-format';

momentFormat(moment);

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
  timerNow: string = '00:00:00';
  timerTimeout: any = null;


  constructor(public activatedRoute: ActivatedRoute, public projectsService: ProjectsService) {
    super();

  }


  addTask() {
    this.loading = true;
    const pack = {
      name: this.form.value.name,
      total: 0,
      project: this.project._id
    };
    if (this.form.value.start && this.form.value.end) {
      pack.total = moment(this.form.value.end).diff(moment(this.form.value.start));
    }
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
      this.getTasks();
    });
    this.someSubscriptions.add(subData);
  }

  getTasks() {
    const subDataTasks = this.projectsService.getTasksOfProject(this.project._id).subscribe((tasks: any) => {
      this.project.tasks = tasks.reverse();
      for (let i = 0; i < this.project.tasks.length; i++) {
        if (this.project.tasks[i].timerStarted) {
          this.currentTimer = this.project.tasks[i].timerStarted;
          this.timerTimeout = setInterval(() => this.updateTimer(), 1000);
          break;
        }
      }
      this.loading = false;
    });
    this.someSubscriptions.add(subDataTasks);

  }

  updateTimer() {
    this.timerNow = this.getTime(moment.duration(moment().diff(moment(this.currentTimer))));
  }

  getTime(time) {
    // @ts-ignore
    return moment.duration(time).format('HH:mm:ss', {trim: false});
  }

  startTimer(task, i) {
    const time = moment().format();
    this.projectsService.updateTask(task._id, {timerStarted: time}).subscribe((resTask) => {
      this.currentTimer = time;
      this.project.tasks[i] = resTask;
      console.log(task);
      this.timerTimeout = setInterval(() => this.updateTimer(), 1000);
    });
  }

  deleteTask(task, i) {
    this.projectsService.deleteTask(task._id).subscribe((res) => {
      this.project.tasks.splice(i, 1);
    });
  }

  stopTimer(task, i) {
    const total = task.total + moment().diff(moment(task.timerStarted));
    this.projectsService.updateTask(task._id, {timerStarted: '', total}).subscribe((resTask) => {
      console.log('this task with start and stop timer');
      clearInterval(this.timerTimeout);
      this.timerNow = '00:00:00';
      this.project.tasks[i] = resTask;
      this.currentTimer = null;
    });
  }
}
