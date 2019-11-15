import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() title: string;
  @Input() number: string | number;
  @Input() active: boolean = false;
  @Input() name: string = null;
  @Input() hideTab: boolean = false;
  @Output() changeTab: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

}
