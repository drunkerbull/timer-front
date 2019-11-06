import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../messages.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StorageService} from '../../../../../shared/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  rooms: any[] = [];
  usersSearch: any[] = [];
  currentRoom: any = null;
  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  searchIsEmpty: boolean = true;

  constructor(public messagesService: MessagesService, public storageService: StorageService) {
  }

  ngOnInit() {

    this.messagesService.getRooms();
    this.form.get('search').valueChanges.subscribe(val => {
      if (val && val.length) {
        this.searchIsEmpty = false;
        this.messagesService.getSearchUsers(val);
      } else {
        this.usersSearch = [];
        this.searchIsEmpty = true;
      }
    });

    this.messagesService.onRoom().subscribe((room: any) => {
      this.currentRoom = room;
      const existRooms = this.rooms.filter(room => room._id === this.currentRoom._id);
      if (!existRooms.length) {
        this.rooms.push(this.currentRoom);
      }
    });
    this.messagesService.onRooms().subscribe((rooms: any[]) => {
      this.rooms = rooms;
    });
    this.messagesService.onSearchUsers().subscribe((users: any) => {
      this.usersSearch = users;
    });


  }

  selectUser(user) {
    this.messagesService.selectOrCreateRoom(user);
    this.form.reset();
  }

  selectRoom(room) {
    this.messagesService.selectRoom(room);
  }

  getRoomName(room) {
    if (!room.name && room.group.length === 2) {
      const name = room.group.find(el => el._id !== this.storageService.user._id);
      return name.nickname;
    }
    return this.currentRoom.name;
  }
}
