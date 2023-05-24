import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { User } from 'src/api/contracts';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { useMessageToast } from 'src/contexts/MessageToastContext';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';

export function useUnsubscribe(subscriberUsername: string | undefined, subscribedUsername: string | undefined) {
    const { messageApi } = useMessageToast();
    const queryClient = useQueryClient();

    const { mutate: unsubscribe } = useMutation({
        mutationFn: (targetUsername: string) => api.subscription.unsubscribe(targetUsername),
        onError: (error) => {
            messageApi?.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Can not unsubscribe, please try again',
            });
        },
        onSuccess: () => {
            queryClient.setQueryData<User>(
                reactQueryHelper.getAuthenticatedUserKey(),
                (prev) =>
                    prev && {
                        ...prev,
                        userInfo: {
                            ...prev.userInfo,
                            subscriptions: prev.userInfo.subscriptions.filter(
                                (x) => x.subscribedUsername !== subscribedUsername,
                            ),
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
                            subscriptions: prev.userInfo.subscriptions.filter(
                                (x) => x.subscribedUsername !== subscribedUsername,
                            ),
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
                            followers: prev.userInfo.followers.filter(
                                (x) => x.subscriberUsername !== subscriberUsername,
                            ),
                        },
                    },
            );
        },
    });

    return { unsubscribe };
}
