import {IUser} from './IUser.interface';
import {ITasks} from './ITasks.interface';

export interface IProject {
  _id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  owner: IUser,
  tasks: ITasks[],
  workers: IUser[]
}
