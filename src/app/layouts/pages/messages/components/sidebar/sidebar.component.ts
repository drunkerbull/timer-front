import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../messages.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  rooms: any[] = [
    {
      name: 'Oleh',
      id: 1
    },
    {
      name: 'Oles',
      id: 2
    },
    {
      name: 'Bitch',
      id: 3
    }
  ];
  usersSearch: any[] = [
    {
      name: 'Vasya'
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
    this.messagesService.onRooms().subscribe(rooms => {
      console.log('rooooms', rooms);
    });
    this.messagesService.onSearchUsers().subscribe(res => {
      console.log('from socket for usersSearch list', res);
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

  selectRoom(room) {
    this.currentRoom = room;
  }

}
