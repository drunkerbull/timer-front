import {Component, OnInit} from '@angular/core';
import {StatisticsService} from './statistics.service';
import {ITasks} from '../../../shared/interfaces/ITasks.interface';
import * as moment from 'moment';
import * as momentFormat from 'moment-duration-format';
import {Label, MultiDataSet} from 'ng2-charts';
import {BaseComponent} from '../../../shared/components/base.component';

momentFormat(moment);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends BaseComponent implements OnInit {
  tasks: ITasks[] = [];
  public chartData: MultiDataSet = [];
  public chartLabels: Label[] = [];
  loading: boolean = true;

  constructor(public statisticsService: StatisticsService) {
    super();
  }

  ngOnInit() {
    this.getStats();
  }

  getTime(time) {
    // @ts-ignore
    return moment.duration(time).format('HH:mm:ss', {trim: false});
  }

  getStats() {
    this.route.queryParamMap.subscribe(queries => {
      // @ts-ignore
      this.updateStatsWithParams(queries.params);
    });

  }

  getStatsWithAverage(query = '') {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {average: query},
        queryParamsHandling: 'merge'
      });
  }

  updateStatsWithParams(params) {
    this.loading = true;
    let queryLine = '?';
    for (let query in params) {
      if (params[query]) {
        queryLine = queryLine + query + '=' + params[query];
      }
    }
    if (queryLine.length === 1) {
      queryLine = '';
    }
    this.statisticsService.getStats(queryLine).subscribe((res) => {
      this.tasks = res;
      this.chartLabels = this.tasks.map((task) => task.name);
      this.chartData = [this.tasks.map((task) => task.total)];
      this.loading = false;
    });
  }
}
