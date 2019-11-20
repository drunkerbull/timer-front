import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {IProject} from '../../../../../shared/interfaces/IProject.interface';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../../projects.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import * as momentFormat from 'moment-duration-format';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ITime} from '../../../../../shared/interfaces/ITime.interface';
import {ITasks} from '../../../../../shared/interfaces/ITasks.interface';

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
  options: any = {skip: 0, type: 'all'};
  searchTasks: FormControl = new FormControl('');
  moment = moment;

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

  changePicker(event) {
    const dates = event.split(' to ');
    if (dates.length === 2) {
      this.form.get('start').setValue(dates[0]);
      this.form.get('end').setValue(dates[1]);
    }
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
      nickname: this.newWorker
    };
    const subAddWorker = this.projectsService.addWorker(this.project._id, pack).subscribe(res => {
      this.project.workers.push(res);
      this.toastr.info(pack.nickname, 'Invite to project');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subAddWorker);
  }

  addTask() {
    const pack = {
      name: this.form.value.name,
      worker: this.project.workers[this.form.value.worker],
      total: 0,
      project: this.project._id
    };
    if (!pack.name || !pack.worker) {
      this.toastr.error('Nickname and Worker are required');
      return;
    }
    if (this.form.value.start && this.form.value.end) {
      pack.total = moment(this.form.value.end, 'DD-MM-YYYY HH:mm').diff(moment(this.form.value.start, 'DD-MM-YYYY HH:mm'));
    }
    this.loading = true;
    const subDataAddTask = this.projectsService.addTaskToProject(pack).subscribe((task: any) => {
      task.owner = this.storageService.user;
      task.worker = this.project.workers[this.form.value.worker];
      this.project.tasks.unshift(task);
      this.loading = false;
      this.openAddBox = false;
      this.form.reset();
      this.toastr.info('Task created');
    }, (err) => {
      this.loading = false;
      this.errorHandlingService.showError(err);
    });
    this.someSubscriptions.add(subDataAddTask);
  }

  ngOnInit() {
    const subData = this.activatedRoute.data.subscribe((project: { project: IProject }) => {
      this.project = project.project;
      this.project.tasks = [];
      this.getTasks();
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subData);
    const subscribeTimerInterval = this.projectsService.timerTimeout.subscribe(el => this.updateTimer());
    this.someSubscriptions.add(subscribeTimerInterval);

    const subSearch = this.searchTasks.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value) => {
      this.options = {...this.options, skip: 0, search: value};
      this.project.tasks = [];
      this.getTasks();
    });
    this.someSubscriptions.add(subSearch);
  }

  changeType(type) {
    if (this.options.type !== 'all') {
      type = 'all';
    }
    this.options = {...this.options, skip: 0, type};
    this.project.tasks = [];
    this.getTasks();
  }


  getTasks() {
    this.loading = true;
    const subDataTasks = this.projectsService.getTasksOfProject(this.project._id, this.options).subscribe((tasks: any) => {
      this.project.tasks = [...this.project.tasks, ...tasks];
      this.options.skip = this.options.skip + tasks.length;
      this.loading = false;
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subDataTasks);
  }

  updateTimer() {
    this.timerNow = this.storageService.user && this.storageService.user.currentTimer
      ? this.getTime(moment.duration(moment().diff(moment(this.storageService.user.currentTimer.start))))
      : '00:00:00';
  }

  getTime(time) {
    // @ts-ignore
    return moment.duration(time).format('HH:mm:ss', {trim: false});
  }

  deleteTask(task, i) {
    const updateTaskDelete = this.projectsService.deleteTask(task._id).subscribe((res) => {
      this.project.tasks.splice(i, 1);
      this.toastr.info('Task deleted');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(updateTaskDelete);
  }


  startTimer(task) {
    const pack: ITime = {task: task._id, start: moment().format()};
    const subCreateTimer = this.projectsService.createTime(pack).subscribe((time: ITime) => {
      this.toastr.info('Timer started');
      const user = this.storageService.user;
      user.currentTimer = time;
      this.storageService.saveUser(user);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subCreateTimer);
  }

  changeTime(currentTime) {
    const pack: ITime = {start: '', end: ''};
    const subCreateTimer = this.projectsService.changeTime(this.storageService.user.currentTimer._id, pack).subscribe((time: ITime) => {
      currentTime = time;
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subCreateTimer);
  }


  stopTimer() {
    const pack: ITime = {end: moment().format()};
    const subStopTimer = this.projectsService.changeTime(this.storageService.user.currentTimer._id, pack).subscribe((time: ITime) => {
      this.toastr.info('Timer stopped');
      const currentTask = this.project.tasks.find((task: ITasks) => task._id === time.task);
      currentTask.times.push(time);
      const user = this.storageService.user;
      user.currentTimer = null;
      this.storageService.saveUser(user);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subStopTimer);
  }
}
