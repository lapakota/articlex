import { UpdateUserInfoDto, User } from '../../contracts';
import axiosWithAuth from '../../interceptors';

export const UserService = {
    async getUser() {
        return axiosWithAuth.get<User>('user');
    },

    async getUserByName(username: string) {
        return axiosWithAuth.get<User>(`user/${username}`);
    },

    async updateUserInfo(data: UpdateUserInfoDto) {
        return axiosWithAuth.patch<User>('user', data);
    },
};
