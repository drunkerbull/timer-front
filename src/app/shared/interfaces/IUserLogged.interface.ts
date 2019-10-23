import {IUser} from './IUser.interface';

export interface IUserLogged {
  user: IUser,
  token: string
}
