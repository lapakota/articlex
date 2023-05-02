import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ThemeContextStore } from './ThemeContext';
import { UserContextStore } from './UserContext';

const queryClient = new QueryClient();

export function ContextStores(props: PropsWithChildren<any>) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserContextStore>
                <ThemeContextStore>{props.children}</ThemeContextStore>
            </UserContextStore>
        </QueryClientProvider>
    );
}
