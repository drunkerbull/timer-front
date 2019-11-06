import {Component} from '@angular/core';
import {MessagesService} from './layouts/pages/messages/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timer-front';

  constructor(public messageService: MessagesService) {

    this.messageService.onNotiMessage().subscribe(res => {
      console.log(res);
    });
  }
}
