import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import {StatisticsService} from './statistics.service';
import {ITasks} from '../../../shared/interfaces/ITasks.interface';
import {Label, MultiDataSet} from 'ng2-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends BaseComponent implements OnInit {
  data: ITasks[] = [];
  public chartData: MultiDataSet = [];
  public chartLabels: Label[] = [];
  loading: boolean = true;
  queryLine: string = '';
  currentType: string = 'worker';
  currentAverageParams: { average: string } = null;
  totalTime: string = '';
  btnTypes: any[] = [
    {
      name: 'worker',
      text: 'I am worker'
    },
    {
      name: 'owner',
      text: 'I am owner of task'
    },
    {
      name: 'owner-project',
      text: 'I am owner of project'
    },
  ];
  btnAverage: any[] = [
    {
      name: 'day',
      text: 'Day'
    },
    {
      name: 'week',
      text: 'Week'
    },
    {
      name: 'months',
      text: 'Months'
    },
    {
      name: '',
      text: 'All time'
    }
  ];

  constructor(public statisticsService: StatisticsService) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queries => {
      // @ts-ignore
      this.currentAverageParams = queries.params;
      this.updateStatsWithParams();
    });
  }

  changeAndUpdateData(type) {
    this.loading = true;
    this.currentType = type;
    this.getStatistics();
  }

  updateStatsWithParams() {
    const params = this.currentAverageParams;
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
    this.changeAndUpdateData(this.currentType);
  }

  getTime(time) {
    // @ts-ignore
    return moment.duration(time).format('HH:mm:ss', {trim: false});
  }

  getStatistics() {
    this.data = [];
    this.statisticsService.getStats(this.currentType, this.queryLine).subscribe((res) => {
      this.data = res;
      this.createChart();
    });
  }

  createChart() {
    this.chartLabels = this.data.map((task) => task.name);
    this.chartData = [this.data.map((task) => task.total)];
    const timers:any[] = this.chartData[0]
    const totalTime = timers.reduce((acc, time) => acc + time);
    this.totalTime = this.getTime(totalTime);
    this.loading = false;
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
