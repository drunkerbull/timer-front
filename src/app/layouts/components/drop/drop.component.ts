import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as Drop from 'tether-drop';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent implements OnInit {
  dropInstance: Drop;
  @ViewChild('dropTarget', {static: true}) dropTarget: ElementRef;
  @ViewChild('dropContent', {static: true}) dropContent: ElementRef;
  @Input() position: string = 'top right';
  @Input() classes: string = '';

  constructor() {
  }

  ngOnInit() {
    this.dropInstance = new Drop({
      target: this.dropTarget.nativeElement,
      content: this.dropContent.nativeElement,
      position: this.position,
      classes: this.classes,
      remove: true,
      constrainToScrollParent: true,
      constrainToWindow: true
    });
  }

  close() {
    this.dropInstance.close();
  }

  open() {
    this.dropInstance.open();
  }
}
