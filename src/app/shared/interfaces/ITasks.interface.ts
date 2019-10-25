import {IProject} from './IProject.interface';
import {IUser} from './IUser.interface';

export interface ITasks {
  _id: string,
  name: string,
  project: string | IProject,
  owner: IUser,
  timerStarted:string,
  total:number,
  createdAt: string,
  updatedAt: string
}