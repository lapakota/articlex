import { PropsWithChildren, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function ErrorContextStore(props: PropsWithChildren<object>) {
    const { children } = props;

    return <ErrorBoundary FallbackComponent={ChunkErrorFallback}>{children}</ErrorBoundary>;
}

function ChunkErrorFallback({ error }: { error: Error }) {
    // Обновляет страницу при проблемах с загрузкой компонента с lazy()
    useEffect(() => {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        const invalidElementType = /Element type is invalid/;

        if (error?.message && (chunkFailedMessage.test(error.message) || invalidElementType.test(error.message))) {
            window.location.reload();
        }
    }, [error]);

    return null;
}
