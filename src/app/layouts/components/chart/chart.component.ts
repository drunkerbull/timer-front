import {Component, Input, OnInit} from '@angular/core';
import {Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';
import * as moment from 'moment';
import * as momentFormat from 'moment-duration-format';

momentFormat(moment);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() chartLabels: Label[] = [];
  @Input() chartData: MultiDataSet = [];
  chartOptions = {
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const res = data.labels[tooltipItem.index] + ': ';
          // @ts-ignore
          const time = moment.duration(data.datasets[0].data[tooltipItem.index]).format('HH:mm:ss', {trim: false});
          return res + time;
        }
      }
    }
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {
  }

  ngOnInit() {
  }


}
