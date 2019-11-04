import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  uri: string = 'ws://localhost:5000';

  constructor() {
    this.socket = io(this.uri);
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
}
