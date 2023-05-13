import { useCallback, useState } from 'react';

export function useModal(initial = false) {
    const [opened, setOpened] = useState<boolean>(initial);

    const onOpenModal = useCallback(() => setOpened(true), []);
    const onCloseModal = useCallback(() => setOpened(false), []);

    return { opened, onOpenModal, onCloseModal };
}
