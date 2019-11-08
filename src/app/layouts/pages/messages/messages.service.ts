import {Injectable} from '@angular/core';
import {SocketService} from '../../../shared/services/socket.service';
import {IUser} from '../../../shared/interfaces/IUser.interface';
import {IRoom} from '../../../shared/interfaces/IRoom.interface';
import {IMessage} from '../../../shared/interfaces/IMessage.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(public socketService: SocketService) {
  }


  onSearchUsers(): Observable<IUser[]> {
    return this.socketService.listen('onSearchUsers');
  }

  onRooms(): Observable<IRoom[]> {
    return this.socketService.listen('onRooms');
  }

  onRoom(): Observable<IRoom> {
    return this.socketService.listen('onRoom');
  }

  onNotiMessage(): Observable<IMessage> {
    return this.socketService.listen('onNotiMessage');
  }

  getSearchUsers(val: string) {
    this.socketService.emit('searchUsers', val.toLowerCase());
  }

  getRooms() {
    this.socketService.emit('rooms');
  }

  selectOrCreateRoom(user: IUser) {
    this.socketService.emit('selectOrCreateRoom', user);
  }

  selectRoom(room: IRoom) {
    this.socketService.emit('selectRoom', room);
  }

  sendMessage(message: IMessage) {
    this.socketService.emit('message', message);
  }

  leaveAllRoom() {
    this.socketService.emit('leaveAllRoom');
  }

}
