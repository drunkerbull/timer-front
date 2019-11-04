import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../messages.service';

@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.scss']
})
export class MessagesBoxComponent implements OnInit {

  constructor(public messagesService: MessagesService) {
  }

  ngOnInit() {

  }

}
