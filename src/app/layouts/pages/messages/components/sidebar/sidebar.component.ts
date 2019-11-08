import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../messages.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StorageService} from '../../../../../shared/services/storage.service';
import {IRoom} from '../../../../../shared/interfaces/IRoom.interface';
import {IMessage} from '../../../../../shared/interfaces/IMessage.interface';
import {IUser} from '../../../../../shared/interfaces/IUser.interface';
import {Room} from '../../../../../shared/models/room.model';
import {BaseComponent} from '../../../../../shared/components/base.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit {
  rooms: IRoom[] = [];
  usersSearch: IUser[] = [];
  currentRoom: IRoom = null;
  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  searchIsEmpty: boolean = true;

  constructor(public messagesService: MessagesService, public storageService: StorageService) {
    super();
  }

  ngOnInit() {

    this.messagesService.getRooms();
    const subSearchValue = this.form.get('search').valueChanges.subscribe(val => {
      if (val && val.length) {
        this.searchIsEmpty = false;
        this.messagesService.getSearchUsers(val);
      } else {
        this.usersSearch = [];
        this.searchIsEmpty = true;
      }
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subSearchValue);

    const subOnRoom = this.messagesService.onRoom().subscribe((room: IRoom) => {
      this.currentRoom = new Room(room);
      const existRooms = this.rooms.filter(room => room._id === this.currentRoom._id);
      if (!existRooms.length) {
        this.rooms.push(this.currentRoom);
      }
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnRoom);

    const subOnRooms = this.messagesService.onRooms().subscribe((rooms: IRoom[]) => {
      this.rooms = rooms.map((room: IRoom) => new Room(room));
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnRooms);

    const subOnSearchUsers = this.messagesService.onSearchUsers().subscribe((users: IUser[]) => {
      this.usersSearch = users;
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnSearchUsers);

    const subOnNotiMessage = this.messagesService.onNotiMessage().subscribe((message: IMessage) => {
      this.rooms.map((room: IRoom) => {
        if (typeof message.owner !== 'string' && room._id === message.room) {
          room.read = [message.owner._id];
        }
      });
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnNotiMessage);
  }

  selectUser(user: IUser) {
    this.messagesService.selectOrCreateRoom(user);
    this.form.reset();
  }

  selectRoom(room: IRoom) {
    if (room.haveNewMess(this.storageService.user)) {
      room.read.push(this.storageService.user._id);
    }
    this.messagesService.selectRoom(room);
  }
}
