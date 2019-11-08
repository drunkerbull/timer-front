import {IUser} from '../interfaces/IUser.interface';
import {IMessage} from '../interfaces/IMessage.interface';
import {IRoom} from '../interfaces/IRoom.interface';

export class Room implements IRoom {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  owner: string;
  read: string[];
  group: IUser[];
  messages: IMessage[];
  constructor(data?: IRoom) {
    Object.assign(this, data);
  }

  roomName(loggedUser: IUser): string {
    if (!this.name && this.group.length === 2) {
      const user = this.group.find(el => el._id !== loggedUser._id);
      return user.nickname;
    }
    return this.name;
  }

  get groupList(): string {
    const group = this.group.map(el => el.nickname);
    return group.join(', ');
  }
  haveNewMess(loggedUser: IUser):boolean {
    return this.read.length && this.read.filter((res) => res === loggedUser._id).length === 0;
  }
}
