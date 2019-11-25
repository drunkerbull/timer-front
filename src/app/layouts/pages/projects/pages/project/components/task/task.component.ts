import {Component, Input, OnInit} from '@angular/core';
import {ITasks} from '../../../../../../../shared/interfaces/ITasks.interface';
import {BaseComponent} from '../../../../../../../shared/components/base.component';
import {ITime} from '../../../../../../../shared/interfaces/ITime.interface';
import * as moment from 'moment';
import {ProjectsService} from '../../../../projects.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent extends BaseComponent implements OnInit {
  @Input() task: ITasks;
  moment = moment;
  timerNow: string = '00:00:00';
  changeMode: number = null;
  changeModeNewTime: string = '';

  constructor(public projectsService: ProjectsService) {
    super();
  }

  ngOnInit() {
    const subscribeTimerInterval = this.projectsService.timerTimeout.subscribe(el => this.updateTimer());
    this.someSubscriptions.add(subscribeTimerInterval);
  }

  deleteTask() {
    const updateTaskDelete = this.projectsService.deleteTask(this.task._id).subscribe((res) => {
      this.toastr.info('Task deleted');
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(updateTaskDelete);
  }

  updateTimer() {
    this.timerNow = this.storageService.user && this.storageService.user.currentTimer
      ? this.getTime(moment.duration(moment().diff(moment(this.storageService.user.currentTimer.start))))
      : '00:00:00';
  }

  startTimer() {
    const pack: ITime = {task: this.task._id, start: moment().format()};
    const subCreateTimer = this.projectsService.createTime(pack).subscribe((time: ITime) => {
      this.toastr.info('Timer started');
      const user = this.storageService.user;
      user.currentTimer = time;
      this.storageService.saveUser(user);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subCreateTimer);
  }


  getTime(time) {
    // @ts-ignore
    return moment.duration(time).format('HH:mm:ss', {trim: false});
  }

  stopTimer() {
    const pack: ITime = {end: moment().format()};
    const subStopTimer = this.projectsService.changeTime(this.storageService.user.currentTimer._id, pack).subscribe((time: ITime) => {
      this.toastr.info('Timer stopped');
      this.task.times.push(time);
      this.task.total = this.task.total + time.total;
      const user = this.storageService.user;
      user.currentTimer = null;
      this.storageService.saveUser(user);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subStopTimer);
  }


  saveChangeTaskTime(time) {
    if (!this.changeModeNewTime) {
      return this.toastr.error('You must select the start date and end date');
    }
    const dates = this.changeModeNewTime
      .split(' to ')
      .map((date) => moment(date, 'DD-MM-YYYY HH:mm').format());
    if (dates.length < 2) {
      return this.toastr.error('You must select the start date AND end date');
    }
    const pack: any = {start: dates[0], end: dates[1]};
    this.projectsService.changeTime(time._id, pack).subscribe((newTime: ITime) => {
      this.resetChangeTaskTime();
      Object.assign(time, newTime);
      const times = this.task.times.map((time: any) => time.total);
      this.task.total = times.reduce((acc, val) => acc + val);
      this.toastr.info('Time updated');
    });
  }

  resetChangeTaskTime() {
    this.changeModeNewTime = null;
    this.changeMode = null;
  }

  deleteTaskTime(time, index) {
    const deleteTaskTime = this.projectsService.deleteTime(time._id).subscribe((res: { message: string }) => {
      this.toastr.info(res.message);
      this.task.times.splice(index, 1);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(deleteTaskTime);
  }

  changePicker(event) {
    this.changeModeNewTime = event;
  }
}
