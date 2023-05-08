import { Layout as AntdLayout, Spin } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './Layout.module.scss';
import { UserDropdown } from './UserDropdown';
import { UserContext } from 'src/contexts/UserContext';
import { useContext } from 'react';
import { FeedRoute } from 'src/routes';
import cn from 'classnames';

const { Header, Content, Footer } = AntdLayout;

export function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useContext(UserContext);

    const onRedirectToFeedPage = () => navigate(FeedRoute.getHref());

    const isFeedPage = location.pathname === FeedRoute.baseRoute;

    return (
        <AntdLayout className={styles.layout}>
            <Header className={styles.header}>
                <span className={styles.logo} onClick={onRedirectToFeedPage}>
                    articlex
                </span>
                <UserDropdown />
            </Header>
            <Content className={styles.content}>
                <div className={styles.pageWrapper}>
                    <div className={cn(styles.page, { [styles.feedPage]: isFeedPage })}>
                        <Spin spinning={!user}>
                            <Outlet />
                        </Spin>
                    </div>
                    {isFeedPage && (
                        <div className={styles.sidePage}>
                            <Spin spinning={!user}>
                                <Outlet />
                            </Spin>
                        </div>
                    )}
                </div>
            </Content>
            <Footer className={styles.footer}>articlex ©2023</Footer>
        </AntdLayout>
    );
}
