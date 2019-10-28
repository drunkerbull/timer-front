import {Component, OnInit} from '@angular/core';
import {StatisticsService} from './statistics.service';
import {ITasks} from '../../../shared/interfaces/ITasks.interface';
import * as moment from 'moment';
import * as momentFormat from 'moment-duration-format';
import {Label, MultiDataSet} from 'ng2-charts';

momentFormat(moment);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  tasks: ITasks[] = [];
  public chartData: MultiDataSet = [];
  public chartLabels: Label[] = [];

  constructor(public statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.getStats();
  }

  getTime(time) {
    // @ts-ignore
    return moment.duration(time).format('HH:mm:ss', {trim: false});
  }

  getStats() {
    this.statisticsService.getStats().subscribe((res) => {
      this.tasks = res;
      this.chartLabels = this.tasks.map((task) => task.name);
      this.chartData = [this.tasks.map((task) => task.total)];
    });
  }
}
