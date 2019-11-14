export interface IUser {
  _id: string,
  createdAt: string,
  email: string,
  nickname: string,
  tokens: { token: string }[],
  updatedAt: string,
  online: string,
  avatar?: string,
  haveAvatar: boolean
}
