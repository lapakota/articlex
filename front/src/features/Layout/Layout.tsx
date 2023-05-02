import { Layout as AntdLayout, Spin, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { UserAvatar } from './UserAvatar';
import { UserContext } from 'src/contexts/UserContext';
import { useContext } from 'react';

const { Header, Content, Footer } = AntdLayout;

export function Layout() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { user } = useContext(UserContext);

    return (
        <AntdLayout className={styles.layout}>
            <Header className={styles.header}>
                <span className={styles.logo}>articlex</span>
                <UserAvatar />
            </Header>
            <Content className={styles.contentWrapper}>
                <div className={styles.content} style={{ background: colorBgContainer }}>
                    <Spin spinning={!user}>
                        <Outlet />
                    </Spin>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>articlex ©2023</Footer>
        </AntdLayout>
    );
}
