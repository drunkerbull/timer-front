import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../messages.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StorageService} from '../../../../../shared/services/storage.service';
import {IRoom} from '../../../../../shared/interfaces/IRoom.interface';
import {IMessage} from '../../../../../shared/interfaces/IMessage.interface';
import {IUser} from '../../../../../shared/interfaces/IUser.interface';
import {Room} from '../../../../../shared/models/room.model';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

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

  constructor(public messagesService: MessagesService, public storageService: StorageService, public activatedRoute: ActivatedRoute,
              private location: Location) {
    super();
  }

  ngOnInit() {

    this.messagesService.getRooms();

    const subSearchValue = this.form.get('search').valueChanges
      .subscribe(val => this.searchValue(val), (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subSearchValue);

    const subOnRoom = this.messagesService.onRoom()
      .subscribe((room: IRoom) => this.onRoom(room), (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnRoom);

    const subOnRooms = this.messagesService.onRooms()
      .subscribe((rooms: IRoom[]) => this.onRooms(rooms), (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnRooms);

    const subOnSearchUsers = this.messagesService.onSearchUsers()
      .subscribe((users: IUser[]) => this.usersSearch = users, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnSearchUsers);

    const subOnNotiMessage = this.messagesService.onNotiMessage()
      .subscribe((message: IMessage) => this.onNotiMessage(message), (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnNotiMessage);
  }

  searchValue(val) {
    if (val && val.length) {
      this.searchIsEmpty = false;
      this.messagesService.getSearchUsers(val);
    } else {
      this.usersSearch = [];
      this.searchIsEmpty = true;
    }
  }

  selectUser(user: IUser) {
    this.messagesService.selectOrCreateRoom(user);
    this.form.reset();
  }

  onRooms(rooms: IRoom[]) {
    this.rooms = rooms.map((room: IRoom) => new Room(room, this.storageService.user));
    this.checkLink();
  }

  onRoom(room: IRoom) {
    this.currentRoom = new Room(room, this.storageService.user);
    const existRooms = this.rooms.filter(room => room._id === this.currentRoom._id);
    if (!existRooms.length) {
      this.rooms.push(this.currentRoom);
    }
    this.location.replaceState('/messages/' + this.currentRoom._id);
  }

  onNotiMessage(message: IMessage) {
    this.rooms.map((room: IRoom) => {
      if (typeof message.owner !== 'string' && room._id === message.room) {
        room.read = [message.owner._id];
      }
    });
  }

  checkLink() {
    const subData = this.activatedRoute.data.subscribe((id: any) => {
      if (id.room) {
        const room = this.rooms.find((room) => room.chatWith._id === id.room);
        if (room) {
          this.selectRoom(room);
        }
      }
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subData);
  }

  selectRoom(room: IRoom) {
    if (room.haveNewMess(this.storageService.user)) {
      room.read.push(this.storageService.user._id);
    }

    this.messagesService.selectRoom(room);
  }
}
