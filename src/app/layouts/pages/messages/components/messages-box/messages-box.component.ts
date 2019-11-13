import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../messages.service';
import {FormControl, FormGroup} from '@angular/forms';
import {StorageService} from '../../../../../shared/services/storage.service';
import {Room} from '../../../../../shared/models/room.model';
import {IRoom} from '../../../../../shared/interfaces/IRoom.interface';
import {BaseComponent} from '../../../../../shared/components/base.component';
import {IMessage} from '../../../../../shared/interfaces/IMessage.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.scss']
})
export class MessagesBoxComponent extends BaseComponent implements OnInit {
  currentRoom: IRoom = null;
  moment = moment;
  form: FormGroup = new FormGroup({
    message: new FormControl('')
  });

  constructor(public messagesService: MessagesService, public storageService: StorageService) {
    super();
  }

  ngOnInit() {
    const subOnRoom = this.messagesService.onRoom().subscribe((room: IRoom) => {
      this.currentRoom = new Room(room);
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnRoom);
  }


  sendMessage() {
    const message: IMessage = {
      type: 'message',
      room: this.currentRoom._id,
      owner: this.storageService.user._id,
      text: this.form.get('message').value
    };
    this.currentRoom.messages.push(message);
    this.messagesService.sendMessage(message);
    this.form.reset();
  }

}
