import { createContext, useContext } from 'react';
import { User } from 'src/api/contracts';

interface UserContextState {
    user: User | undefined;
}

export const UserContext = createContext<UserContextState>({ user: undefined });

export const useAuthenticatedUser = () => useContext(UserContext);
