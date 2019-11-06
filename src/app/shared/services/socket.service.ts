import {Injectable, OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';
import {fromEvent} from 'rxjs';
import {StorageService} from './storage.service';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SocketService{
  socket: any;
  uri: string = environment.ws;

  constructor(private toastr: ToastrService, public storageService: StorageService) {
    if (this.storageService.userLogged) {
      this.initSocket();
    }
  }

  initSocket() {
    this.socket = io(this.uri, {
      query: {token: this.storageService.userLogged}
    });
    this.listen('onNotiMessage').subscribe((res:any)=>{
      this.toastr.info(res.text, 'SMS from '+ res.owner.nickname);
    })

  }

  listen(eventName) {
    return fromEvent(this.socket, eventName);
  }

  emit(eventName, data = {}) {
    this.socket.emit(eventName, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
