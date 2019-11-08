import {Injectable, OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';
import {fromEvent, Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {IRoom} from '../interfaces/IRoom.interface';
import {IMessage} from '../interfaces/IMessage.interface';

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
    this.listen('onNotiMessage').subscribe((message: IMessage)=>{
      if (typeof message.owner !== 'string') {
        this.toastr.info(message.text, 'SMS from ' + message.owner.nickname);
      }
    })

  }

  listen(eventName:string): Observable<any> {
    return fromEvent(this.socket, eventName);
  }

  emit(eventName, data = {}) {
    this.socket.emit(eventName, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
