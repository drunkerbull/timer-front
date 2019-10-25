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
  newWorker: string = '';

  constructor(public activatedRoute: ActivatedRoute, public projectsService: ProjectsService) {
    super();

  }

  changePicker(name, event) {
    this.form.get(name).setValue(event);
  }

  deleteWorker(worker, i) {
    const subDeleteWorker = this.projectsService.deleteWorker(this.project._id, worker).subscribe(res => {
      this.project.workers.splice(i, 1);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDeleteWorker);
  }

  addWorker() {
    const pack = {
      email: this.newWorker
    };
    const subAddWorker = this.projectsService.addWorker(this.project._id, pack).subscribe(res => {
      this.project.workers.push(res);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subAddWorker);
  }

  addTask() {
    this.loading = true;
    const pack = {
      name: this.form.value.name,
      total: 0,
      project: this.project._id
    };
    if (this.form.value.start && this.form.value.end) {
      pack.total = moment(this.form.value.end, 'DD-MM-YYYY HH:mm').diff(moment(this.form.value.start, 'DD-MM-YYYY HH:mm'));
    }
    const subDataAddTask = this.projectsService.addTaskToProject(pack).subscribe((task: any) => {
      task.owner = this.storageService.user;
      this.project.tasks.unshift(task);
      this.loading = false;
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDataAddTask);
  }

  ngOnInit() {
    const subData = this.activatedRoute.data.subscribe((project: { project: IProject }) => {
      this.project = project.project;
      this.loading = true;
      this.getTasks();
    }, (err) => this.errorHandlingService.showError(err));
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
    }, (err) => this.errorHandlingService.showError(err));
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
    const updateTimerStart = this.projectsService.updateTask(task._id, {timerStarted: time}).subscribe((resTask) => {
      this.currentTimer = time;
      this.project.tasks[i].timerStarted = time;
      this.timerTimeout = setInterval(() => this.updateTimer(), 1000);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(updateTimerStart);
  }

  deleteTask(task, i) {
    const updateTaskDelete = this.projectsService.deleteTask(task._id).subscribe((res) => {
      this.project.tasks.splice(i, 1);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(updateTaskDelete);
  }

  stopTimer(task, i) {
    const total = task.total + moment().diff(moment(task.timerStarted));
    const updateTimerStop = this.projectsService.updateTask(task._id, {
      timerStarted: '',
      total
    }).subscribe((resTask) => {
      clearInterval(this.timerTimeout);
      this.timerNow = '00:00:00';
      this.project.tasks[i].timerStarted = resTask.timerStarted;
      this.project.tasks[i].total = resTask.total;
      this.currentTimer = null;
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(updateTimerStop);
  }
}
