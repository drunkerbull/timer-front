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

  objectGroup?: any;

  roomName?(IUser): { nickname: string, avatar: string } | IUser;

  haveNewMess?(IUser): boolean;

  groupList: string;
  chatWith?: IUser;
}
