import { PropsWithChildren, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { api } from 'src/api/api';
import { User } from 'src/api/contracts';
import { useNavigate } from 'react-router-dom';
import { AuthRoute } from 'src/routes';
import axios from 'axios';

export function UserContextStore(props: PropsWithChildren<any>) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.user.getUser();
                setUser(response.data);
            } catch (e) {
                // TODO throw error in error context and show error page
                if (axios.isAxiosError(e) && e.response?.status === 401) {
                    navigate(AuthRoute.getHref('signin'));
                }
            }
        }

        getUser();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
}
