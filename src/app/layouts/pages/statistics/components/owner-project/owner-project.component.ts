import {Component, OnInit} from '@angular/core';
import {ITasks} from '../../../../../shared/interfaces/ITasks.interface';
import {Label, MultiDataSet} from 'ng2-charts';
import {StatisticsService} from '../../statistics.service';
import * as moment from 'moment';
import {BaseComponent} from '../../../../../shared/components/base.component';
import * as momentFormat from 'moment-duration-format';

momentFormat(moment);

@Component({
  selector: 'app-owner-project',
  templateUrl: './owner-project.component.html',
  styleUrls: ['./owner-project.component.scss']
})
export class OwnerProjectComponent extends BaseComponent implements OnInit {

  data: ITasks[] = [];
  public chartData: MultiDataSet = [];
  public chartLabels: Label[] = [];
  loading: boolean = true;
  queryLine: string = '';

  constructor(public statisticsService: StatisticsService) {
    super();
  }

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.route.queryParamMap.subscribe(queries => {
      // @ts-ignore
      this.updateStatsWithParams(queries.params);
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
    this.queryLine = queryLine;
    this.getStatisticsOwnerProject();
  }

  getStatisticsOwnerProject() {
    this.data = [];
    this.statisticsService.getStatsOwnerProject(this.queryLine).subscribe((res) => {
      this.data = res;
      this.createChart();
    });
  }

  createChart() {
    this.chartLabels = this.data.map((task) => task.name);
    this.chartData = [this.data.map((task) => task.total)];
    this.loading = false;
  }

  getTime(time) {
    // @ts-ignore
    return moment.duration(time).format('HH:mm:ss', {trim: false});
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
}
