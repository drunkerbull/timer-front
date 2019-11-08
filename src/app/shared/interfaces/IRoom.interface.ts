import {IUser} from './IUser.interface';
import {IMessage} from './IMessage.interface';

export interface IRoom {
  _id: string,
  createdAt: string,
  updatedAt: string,
  name: string;
  owner: string;
  read: string[];
  group: IUser[];
  messages: IMessage[];

  roomName?(IUser): string;
  haveNewMess?(IUser): boolean;

  groupList: string;
}
