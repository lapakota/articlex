import { Layout as AntdLayout, Spin } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserDropdown } from './UserDropdown';
import { useCurrentUser } from 'src/contexts/UserContext';
import { FeedRoute } from 'src/routes';
import { FeedFilters } from '../Feed/FeedFilters';
import { ArticlexLogo } from './ArticlexLogo';
import cn from 'classnames';
import styles from './Layout.module.scss';

const { Header, Content, Footer } = AntdLayout;

export function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useCurrentUser();

    const onRedirectToFeedPage = () => navigate(FeedRoute.getHref());

    const isFeedPage = location.pathname === FeedRoute.baseRoute;

    return (
        <AntdLayout className={styles.layout}>
            <Header className={styles.header}>
                <div className={styles.headerContent}>
                    <span className={styles.logo} onClick={onRedirectToFeedPage}>
                        <ArticlexLogo />
                    </span>
                    <UserDropdown />
                </div>
            </Header>
            <Content className={styles.content}>
                {isFeedPage ? (
                    <div className={cn(styles.pageWrapper, styles.feedPage)}>
                        <FeedFilters />
                        <div className={cn(styles.page)}>
                            <Spin spinning={!user}>
                                <Outlet />
                            </Spin>
                        </div>
                    </div>
                ) : (
                    <div className={cn(styles.pageWrapper)}>
                        <div className={cn(styles.page)}>
                            <Spin spinning={!user}>
                                <Outlet />
                            </Spin>
                        </div>
                    </div>
                )}
            </Content>
            <Footer className={styles.footer}>articlex ©2023</Footer>
        </AntdLayout>
    );
}
