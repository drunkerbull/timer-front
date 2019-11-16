import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  options: any = {skip: 0};
  @ViewChild('messagebox', {static: false}) messagebox: ElementRef;

  constructor(public messagesService: MessagesService, public storageService: StorageService) {
    super();
  }

  ngOnInit() {
    const subOnRoom = this.messagesService.onRoom().subscribe((room: IRoom) => {
      this.currentRoom = new Room(room);
      this.currentRoom.messages = this.currentRoom.messages.reverse()
      this.options.skip = this.currentRoom.messages.length;
      this.boxScrollDown();
    }, (err) => this.errorHandlingService.showError(err));
    this.someSubscriptions.add(subOnRoom);

    this.messagesService.onLoadMoreMessages().subscribe((room: IRoom) => {
      this.options.skip = this.options.skip + room.messages.length;
      this.currentRoom.messages = [ ...room.messages.reverse(),...this.currentRoom.messages];
    });
  }

  boxScrollDown() {
      setTimeout(() => {
        this.messagebox.nativeElement.scrollTo(0, this.messagebox.nativeElement.scrollHeight);
      });
  }

  loadMoreMessages() {
    this.messagesService.loadMoreMessages(this.currentRoom, this.options);
  }

  sendMessage() {
    if (this.form.get('message').value.trim().length === 0) {
      this.toastr.error('You cant send empty message');
      return;
    }
    const message: IMessage = {
      type: 'message',
      room: this.currentRoom._id,
      owner: this.storageService.user._id,
      text: this.form.get('message').value
    };
    this.currentRoom.messages.push(message);
    this.messagesService.sendMessage(message);
    this.form.reset();
    this.boxScrollDown();
  }

}
