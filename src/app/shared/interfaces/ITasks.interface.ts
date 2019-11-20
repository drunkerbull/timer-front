import {IProject} from './IProject.interface';
import {IUser} from './IUser.interface';
import {ITime} from './ITime.interface';

export interface ITasks {
  _id: string,
  name: string,
  project: string | IProject,
  owner: IUser,
  timerStarted: string,
  total: number,
  worker: IUser,
  createdAt: string,
  updatedAt: string,
  times: ITime[]
}
