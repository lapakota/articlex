import { Subscription } from '../../contracts';
import axiosWithAuth from '../../interceptors';

export const SubscriptionService = {
    async subscribe(targetUsername: string) {
        return axiosWithAuth.post<Subscription>(`subscription/${targetUsername}`);
    },

    async unsubscribe(targetUsername: string) {
        return axiosWithAuth.delete<void>(`subscription/${targetUsername}`);
    },
};
