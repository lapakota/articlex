import { UpdateUserInfoDto, User } from '../contracts';
import axiosWithAuth from '../interceptors';
import axios from 'axios';

export const UserService = {
    async getUser() {
        return axiosWithAuth.get<User>('user');
    },

    async updateUserInfo(data: UpdateUserInfoDto) {
        return axios.patch<User>('user', data);
    },
};
