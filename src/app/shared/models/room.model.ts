import {IUser} from '../interfaces/IUser.interface';
import {IMessage} from '../interfaces/IMessage.interface';
import {IRoom} from '../interfaces/IRoom.interface';
import {User} from './user.model';

export class Room implements IRoom {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  owner: string;
  read: string[];
  group: IUser[];
  messages: IMessage[];

  chatWith: IUser = null;
  objectGroup: any = {};

  constructor(data?: IRoom, currentUserLogged?: IUser) {
    Object.assign(this, data);

    this.group = this.group.map((user: IUser) => {
      const newUser = new User(user);
      this.objectGroup[newUser._id] = newUser;
      return newUser;
    });

    if (currentUserLogged && this.group.length > 1) {
      this.chatWith = this.group.find((user: IUser) => user._id !== currentUserLogged._id);
    }
  }


  roomName(loggedUser): { nickname: string, avatar: string } | IUser {
    if (!this.name && this.group.length === 2) {
      const user: IUser = this.group.find(el => el._id !== loggedUser._id);
      return user;
    }
    return {nickname: this.name, avatar: ''};
  }

  get groupList(): string {
    const group = this.group.map(el => el.nickname);
    return group.join(', ');
  }

  haveNewMess(loggedUser: IUser): boolean {
    return this.read.length && this.read.filter((res) => res === loggedUser._id).length === 0;
  }
}
