import { Layout as AntdLayout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { UserAvatar } from './UserAvatar';

const { Header, Content, Footer } = AntdLayout;

export function Layout() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <AntdLayout className={styles.layout}>
            <Header className={styles.header}>
                <span className={styles.logo}>articlex</span>
                <UserAvatar />
            </Header>
            <Content className={styles.contentWrapper}>
                <div className={styles.content} style={{ background: colorBgContainer }}>
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>articlex ©2023</Footer>
        </AntdLayout>
    );
}
