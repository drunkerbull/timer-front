import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }


  ngOnInit(): void {
  }


  getStatisticsOwner() {
    // this.tasks = [];
    // this.statisticsService.getStatsOwner(this.queryLine).subscribe((res) => {
    //   this.tasks = res;
    // });
  }
}
