import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesService} from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  constructor(public messagesService: MessagesService) {
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.messagesService.leaveAllRoom();
  }
}
