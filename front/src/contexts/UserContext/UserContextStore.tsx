import { PropsWithChildren, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { api } from 'src/api/api';
import { User } from 'src/api/contracts';
import { useNavigate } from 'react-router';
import { isHttpError } from 'src/helpers/errors';

export function UserContextStore(props: PropsWithChildren<any>) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.user.getUser();
                setUser(response.data);
            } catch (e) {
                if (isHttpError(e) && e.httpStatus === 401) {
                // TODO throw error in error context

                }
            }
        }

        getUser();
    }, []);

    return <UserContext.Provider value={{ user }}>{props.children}</UserContext.Provider>;
}
