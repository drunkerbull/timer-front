import {IUser} from './IUser.interface';

export interface IMessage {
  _id?: string,
  createdAt?: string,
  updatedAt?: string,
  owner: string | IUser,
  room: string,
  text: string,
  type:string
}
