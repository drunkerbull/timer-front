import {ITasks} from './ITasks.interface';

export interface IUser {
  _id: string,
  createdAt: string,
  email: string,
  nickname: string,
  tokens: { token: string }[],
  updatedAt: string,
  online: string,
  avatar?: string,
  haveAvatar: boolean,
  currentTimer: ITasks | null,
  disableNotifications: boolean,
  blockEveryoneWhoWantWriteMe: boolean,
  blockEveryoneWhoWantAddMeToProject: boolean,
  blackList:string[]
}
