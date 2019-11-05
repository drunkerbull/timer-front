import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../messages.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StorageService} from '../../../../../shared/services/storage.service';

@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.scss']
})
export class MessagesBoxComponent implements OnInit {
  currentRoom: any = null;
  form: FormGroup = new FormGroup({
    message: new FormControl('')
  });

  constructor(public messagesService: MessagesService, public storageService: StorageService) {
  }

  ngOnInit() {
    this.messagesService.onRoom().subscribe((room: any) => {
      this.currentRoom = room;
    });
  }

  get groupList() {
    const group = this.currentRoom.group.map(el => el.nickname);
    return group.join(', ');
  }

  get roomName() {
    if (!this.currentRoom.name && this.currentRoom.group.length === 2) {
      const name = this.currentRoom.group.filter(el => el._id !== this.storageService.user._id);
      return name[0].nickname;
    }
    return this.currentRoom.name;
  }

  sendMessage() {
    const pack = {
      type: 'message',
      room: this.currentRoom._id,
      owner: this.storageService.user._id,
      text: this.form.get('message').value
    };
    this.currentRoom.messages.push(pack);
    this.messagesService.sendMessage(pack);
    this.form.reset();
  }
}
