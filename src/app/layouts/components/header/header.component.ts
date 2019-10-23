import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
