import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { Subscription, User } from 'src/api/contracts';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { useMessageToast } from 'src/contexts/MessageToastContext';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';

export function useSubscribe(subscriberUsername: string | undefined, subscribedUsername: string | undefined) {
    const { messageApi } = useMessageToast();
    const queryClient = useQueryClient();

    const { mutate: subscribe } = useMutation({
        mutationFn: (targetUsername: string) => api.subscription.subscribe(targetUsername).then((x) => x.data),
        onError: (error) => {
            messageApi?.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Can not subscribe, please try again',
            });
        },
        onSuccess: (newSubscription: Subscription) => {
            queryClient.setQueryData<User>(
                reactQueryHelper.getAuthenticatedUserKey(),
                (prev) =>
                    prev && {
                        ...prev,
                        userInfo: {
                            ...prev.userInfo,
                            subscriptions: [...prev.userInfo.subscriptions, newSubscription],
                        },
                    },
            );
            queryClient.setQueryData<User>(
                reactQueryHelper.getUserKey(subscriberUsername),
                (prev) =>
                    prev && {
                        ...prev,
                        userInfo: {
                            ...prev.userInfo,
                            subscriptions: [...prev.userInfo.subscriptions, newSubscription],
                        },
                    },
            );
            queryClient.setQueryData<User>(
                reactQueryHelper.getUserKey(subscribedUsername),
                (prev) =>
                    prev && {
                        ...prev,
                        userInfo: {
                            ...prev.userInfo,
                            followers: [...prev.userInfo.followers, newSubscription],
                        },
                    },
            );
        },
    });

    return { subscribe };
}
