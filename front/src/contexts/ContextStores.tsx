import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ThemeContextStore } from './ThemeContext';

const queryClient = new QueryClient();

export function ContextStores(props: PropsWithChildren<any>) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContextStore>{props.children}</ThemeContextStore>
        </QueryClientProvider>
    );
}
