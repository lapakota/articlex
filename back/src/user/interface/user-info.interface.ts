export interface UserInfoData {
  id: number;
  username: string;
  userInfo: {
    id: number;
    email: string;
    fullName: string;
    gender: string;
    avatar?: string;
  };
}
