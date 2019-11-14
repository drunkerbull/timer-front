import {IUser} from '../interfaces/IUser.interface';
import {environment} from '../../../environments/environment';
import {ITasks} from '../interfaces/ITasks.interface';

export class User implements IUser {
  _id: string;
  createdAt: string = '';
  email: string = '';
  nickname: string = '';
  tokens: { token: string }[] = [];
  updatedAt: string = '';
  online: string = null;

  avatar: string = null;
  haveAvatar: boolean = false;
  currentTimer: ITasks | null = null;

  constructor(data: IUser, token?: string) {
    Object.assign(this, data);
    if (token) {
      this.tokens.push({token});
    }
    this.avatar = this.haveAvatar ? environment.host + '/users/' + this._id + '/avatar' : '/assets/img/defaultAvatar.png';
  }


}
