import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ThemeContextStore } from './ThemeContext';
import { UserContextStore } from './UserContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export function ContextStores(props: PropsWithChildren<any>) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserContextStore>
                <ThemeContextStore>{props.children}</ThemeContextStore>
            </UserContextStore>
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>
    );
}
