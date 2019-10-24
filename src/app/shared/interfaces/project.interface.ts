import {IUser} from './IUser.interface';

export interface Project {
  _id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  owner: IUser,
  tasks?: any[],
  workers: string[]
}
