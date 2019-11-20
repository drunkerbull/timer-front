import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../../../pages/projects/projects.service';
import * as moment from 'moment';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {interval} from 'rxjs';

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
    // const currentTaskTimer = this.storageService.user.currentTimer;
    // const total = currentTaskTimer.total + moment().diff(moment(currentTaskTimer.start));
    // const pack = {timerStarted: '', total};
    // const updateTimerStop = this.projectsService.updateTask(currentTaskTimer._id, pack).subscribe((resTask) => {
    //   this.timerNow = '00:00:00';
    //   this.toastr.info('Timer stop', currentTaskTimer.name);
    //   this.projectsService.toggleUserTimer(currentTaskTimer).subscribe(user => this.storageService.saveUser(user));
    // }, (err) => this.errorHandlingService.showError(err));
    // this.someSubscriptions.add(updateTimerStop);
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
