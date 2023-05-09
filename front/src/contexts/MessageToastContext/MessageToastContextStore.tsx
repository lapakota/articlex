import { PropsWithChildren } from 'react';
import { MessageToastContext } from './MessageToastContext';
import { message } from 'antd';

export function MessageToastContextStore(props: PropsWithChildren<any>) {
    const [messageApi, messageContextHolder] = message.useMessage();

    return (
        <MessageToastContext.Provider value={{ messageApi }}>
            <>
                {messageContextHolder}
                {props.children}
            </>
        </MessageToastContext.Provider>
    );
}
