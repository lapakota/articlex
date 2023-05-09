import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeContextStore } from './ThemeContext';
import { UserContextStore } from './UserContext';
import { MessageToastContextStore } from './MessageToastContext';

const queryClient = new QueryClient();

export function ContextStores(props: PropsWithChildren<any>) {
    return (
        <QueryClientProvider client={queryClient}>
            <MessageToastContextStore>
                <UserContextStore>
                    <ThemeContextStore>{props.children}</ThemeContextStore>
                </UserContextStore>
            </MessageToastContextStore>

            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>
    );
}
