import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../shared/components/base.component';
import {SocketService} from '../../../shared/services/socket.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  useravatar: string = environment.host + '/users/' + this.storageService.user._id + '/avatar';

  constructor(public socketService: SocketService) {
    super();
  }

  ngOnInit() {
  }

  logout() {
    this.storageService.logout();
    this.socketService.disconnect();
  }
}
