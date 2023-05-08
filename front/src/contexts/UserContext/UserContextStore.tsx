import { PropsWithChildren } from 'react';
import { UserContext } from './UserContext';
import { api } from 'src/api/api';
import { useNavigate } from 'react-router-dom';
import { AuthRoute } from 'src/routes';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { reactQueryHelper } from 'src/api/reactQuery.helper';

export function UserContextStore(props: PropsWithChildren<any>) {
    const navigate = useNavigate();

    const { data: user } = useQuery({
        queryKey: reactQueryHelper.getAuthenticatedUserKey(),
        queryFn: () => api.user.getUser().then((x) => x.data),
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate(AuthRoute.getHref('signin'));
            }
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    return <UserContext.Provider value={{ user }}>{props.children}</UserContext.Provider>;
}
