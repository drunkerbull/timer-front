import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../../../pages/projects/projects.service';
import * as moment from 'moment';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {ITime} from '../../../../../shared/interfaces/ITime.interface';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent extends BaseComponent implements OnInit {

  timerNow: string = '00:00:00';

  constructor(public projectsService: ProjectsService) {
    super();
  }

  ngOnInit() {
    const subscribeTimerInterval = this.projectsService.timerTimeout.subscribe(el => this.updateTimer());
    this.someSubscriptions.add(subscribeTimerInterval);
  }

  stopTimer() {
    const pack: ITime = {end: moment().format()};
    const subStopTimer = this.projectsService.changeTime(this.storageService.user.currentTimer._id, pack).subscribe((time: ITime) => {
      this.toastr.info('Timer stopped');
      const user = this.storageService.user;
      user.currentTimer = null;
      this.storageService.saveUser(user);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subStopTimer);
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
}
