import { MessageInstance } from 'antd/es/message/interface';
import { createContext, useContext } from 'react';

interface MessageToastContext {
    messageApi: MessageInstance | undefined;
}

export const MessageToastContext = createContext<MessageToastContext>({ messageApi: undefined });

export const useMessageToast = () => useContext(MessageToastContext);
