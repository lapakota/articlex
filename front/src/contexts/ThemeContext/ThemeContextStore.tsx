import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

const customTheme = {
    token: {
        fontSize: 16,
    },
};

export function ThemeContextStore(props: PropsWithChildren<any>) {
    return <ConfigProvider theme={customTheme}>{props.children}</ConfigProvider>;
}
