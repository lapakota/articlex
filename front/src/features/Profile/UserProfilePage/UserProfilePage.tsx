import { useQuery } from '@tanstack/react-query';
import { Space, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { api } from 'src/api/api';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { PageContent } from 'src/components/PageContent';
import { UserAvatar } from 'src/components/UserAvatar/UserAvatar';
import { UserProfileRouteParams } from 'src/routes';
import styles from './UserProfilePage.module.scss';

enum UserProfileTabs {
    Posts = 'posts',
    Liked = 'liked',
}

export function UserProfilePage() {
    const { username } = useParams<UserProfileRouteParams>();

    const { isLoading, data: user } = useQuery({
        queryKey: reactQueryHelper.getUserKey(username),
        queryFn: () => api.user.getUserByName(username || '').then((x) => x.data),
    });

    const tabItems = [
        {
            label: 'User posts',
            key: UserProfileTabs.Posts,
            children: 'User posts',
        },
        {
            label: 'User liked',
            key: UserProfileTabs.Liked,
            children: 'User liked',
        },
    ];

    // TODO отображать статьи пользователя и лайкнутые
    return (
        <PageContent>
            <PageContent.Header>
                <UserAvatar user={user} size={128} />
            </PageContent.Header>
            <PageContent.Body spinning={isLoading}>
                <Space direction='vertical' size={'large'}>
                    <div className={styles.userInfo}>
                        <div>
                            <div className={styles.caption}>Username</div>
                            <span>{user?.username}</span>
                        </div>
                        <div>
                            <div className={styles.caption}>Email</div>
                            <span>{user?.userInfo.email}</span>
                        </div>
                        <div>
                            <div className={styles.caption}>Full name</div>
                            <span>{user?.userInfo.fullName}</span>
                        </div>
                        <div>
                            <div className={styles.caption}>Gender</div>
                            <span>{user?.userInfo.gender}</span>
                        </div>
                    </div>
                    <Tabs defaultActiveKey={UserProfileTabs.Posts} items={tabItems} />
                </Space>
            </PageContent.Body>
        </PageContent>
    );
}
