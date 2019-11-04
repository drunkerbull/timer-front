import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../messages.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  rooms: any[] = [];
  usersSearch: any[] = [
    {
      nickname: 'Vasya'
    }
  ];
  currentRoom: any = null;
  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  searchIsEmpty: boolean = true;

  constructor(public messagesService: MessagesService) {
  }

  ngOnInit() {
    this.messagesService.onRooms().subscribe((rooms: any[]) => {
      this.rooms = rooms;
    });
    this.messagesService.onSearchUsers().subscribe((users: any) => {
      this.usersSearch = users;
    });
    this.messagesService.getRooms();
    this.form.get('search').valueChanges.subscribe(val => {
      if (val.length) {
        this.searchIsEmpty = false;
        this.messagesService.getSearchUsers(val);
      } else {
        this.usersSearch = [];
        this.searchIsEmpty = true;
      }
    });
  }

  selectUser(user) {
  }

  selectRoom(room) {
    this.currentRoom = room;
  }

}
