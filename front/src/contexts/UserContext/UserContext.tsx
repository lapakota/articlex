import { createContext } from 'react';
import { User } from 'src/api/contracts';

interface UserContextState {
    user: User | undefined;
    setUser: (user: User) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const UserContext = createContext<UserContextState>({ user: undefined, setUser: () => {} });
