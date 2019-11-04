import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  uri: string = 'ws://localhost:5000';

  constructor(public storageService: StorageService) {
    this.socket = io(this.uri, {
      query: {token: this.storageService.userLogged}
    });

  }

  listen(eventName) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName, data = {}) {
    this.socket.emit(eventName, data);
  }

  disconnect(){
    this.socket.disconnect()
  }
}
