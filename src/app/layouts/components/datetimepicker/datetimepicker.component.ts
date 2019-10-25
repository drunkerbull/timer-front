import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent implements OnInit {
  @ViewChild('inputDate', {static: true}) inputDate: ElementRef;
  @Output() changeEl: EventEmitter<any> = new EventEmitter();
  @Input() placeholder: string = '';

  constructor() {
  }

  ngOnInit() {
    const self = this;
    flatpickr(this.inputDate.nativeElement, {
      enableTime: true,
      dateFormat: 'd-m-Y H:i',
      onValueUpdate(selectedDates, dateStr, instance) {
        self.changeEl.emit(dateStr);
      }
    });
  }

}

