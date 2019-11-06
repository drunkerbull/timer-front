import {Injectable} from '@angular/core';
import {SocketService} from '../../../shared/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(public socketService: SocketService) {
  }

  getSearchUsers(val) {
    this.socketService.emit('searchUsers', val.toLowerCase());
  }

  onSearchUsers() {
    return this.socketService.listen('onSearchUsers');
  }


  getRooms() {
    this.socketService.emit('rooms');
  }

  onRooms() {
    return this.socketService.listen('onRooms');
  }


  onRoom() {
    return this.socketService.listen('onRoom');
  }

  selectOrCreateRoom(user) {
    this.socketService.emit('selectOrCreateRoom', user);
  }

  onNotiMessage(){
    return this.socketService.listen('onNotiMessage');
  }
  selectRoom(room) {
    this.socketService.emit('selectRoom', room);
  }

  sendMessage(pack) {
    this.socketService.emit('message',pack);
  }

  leaveAllRoom(){
    this.socketService.emit('leaveAllRoom');
  }

}
