import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {IProject} from '../../../../../shared/interfaces/IProject.interface';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../../projects.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import * as momentFormat from 'moment-duration-format';
import {interval} from 'rxjs';

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
    worker: new FormControl('')
  });
  timerNow: string = '00:00:00';
  newWorker: string = '';
  changeProjectMode: boolean = false;

  constructor(public activatedRoute: ActivatedRoute, public projectsService: ProjectsService) {
    super();
  }

  deleteProject() {
    const subDeleteProject = this.projectsService.deleteProject(this.project._id).subscribe(res => {
      this.router.navigate(['/projects']);
      this.toastr.info('Project has been deleted');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDeleteProject);
  }

  changeProject() {
    this.changeProjectMode = !this.changeProjectMode;

    if (!this.changeProjectMode) {
      const pack = {
        name: this.project.name
      };
      const subUpdateProject = this.projectsService.updateProject(this.project._id, pack).subscribe(res => {
        this.project.name = res.name;
        this.toastr.info('Project has been updated');
      }, (err) => this.errorHandlingService.showError(err));
      this.someSubscriptions.add(subUpdateProject);
    }
  }

  changePicker(name, event) {
    this.form.get(name).setValue(event);
  }

  deleteWorker(worker, i) {
    const subDeleteWorker = this.projectsService.deleteWorker(this.project._id, worker).subscribe(res => {
      this.project.workers.splice(i, 1);
      this.toastr.info('Worker deleted from project');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDeleteWorker);
  }

  addWorker() {
    const pack = {
      email: this.newWorker
    };
    const subAddWorker = this.projectsService.addWorker(this.project._id, pack).subscribe(res => {
      this.project.workers.push(res);
      this.toastr.info(pack.email, 'Invite to project');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subAddWorker);
  }

  addTask() {
    this.loading = true;
    const pack = {
      name: this.form.value.name,
      worker: this.project.workers[this.form.value.worker],
      total: 0,
      project: this.project._id
    };
    if (this.form.value.start && this.form.value.end) {
      pack.total = moment(this.form.value.end, 'DD-MM-YYYY HH:mm').diff(moment(this.form.value.start, 'DD-MM-YYYY HH:mm'));
    }
    const subDataAddTask = this.projectsService.addTaskToProject(pack).subscribe((task: any) => {
      task.owner = this.storageService.user;
      task.worker = this.project.workers[this.form.value.worker];
      this.project.tasks.unshift(task);
      this.loading = false;
      this.openAddBox = false;
      this.form.reset();
      this.toastr.info('Task created');
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


    const subscribeTimerInterval = this.projectsService.timerTimeout.subscribe(el => this.updateTimer());
    this.someSubscriptions.add(subscribeTimerInterval);
  }

  getTasks() {
    const subDataTasks = this.projectsService.getTasksOfProject(this.project._id).subscribe((tasks: any) => {
      this.project.tasks = tasks.reverse();
      this.loading = false;
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDataTasks);

  }

  updateTimer() {
    this.timerNow = this.storageService.user && this.storageService.user.currentTimer
      ? this.getTime(moment.duration(moment().diff(moment(this.storageService.user.currentTimer.timerStarted))))
      : '00:00:00';
  }

  getTime(time) {
    // @ts-ignore
    return moment.duration(time).format('HH:mm:ss', {trim: false});
  }

  startTimer(task) {
    const time = moment().format();
    const updateTimerStart = this.projectsService.updateTask(task._id, {timerStarted: time}).subscribe((resTask) => {
      task.timerStarted = time;
      this.toastr.info('Timer started');
      this.projectsService.toggleUserTimer(task).subscribe(user => this.storageService.saveUser(user));
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(updateTimerStart);
  }

  deleteTask(task, i) {
    const updateTaskDelete = this.projectsService.deleteTask(task._id).subscribe((res) => {
      this.project.tasks.splice(i, 1);
      this.toastr.info('Task deleted');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(updateTaskDelete);
  }

  stopTimer(task) {
    const total = task.total + moment().diff(moment(task.timerStarted));
    const pack = {timerStarted: '', total};
    const updateTimerStop = this.projectsService.updateTask(task._id, pack).subscribe((resTask) => {
      task.timerStarted = null;
      task.total = total;
      this.toastr.info('Timer stop', task.name);
      this.projectsService.toggleUserTimer(task).subscribe(user => this.storageService.saveUser(user));

    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(updateTimerStop);
  }
}
