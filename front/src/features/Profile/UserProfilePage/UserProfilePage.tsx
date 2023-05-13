import { useQuery } from '@tanstack/react-query';
import { Button, Space, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { api } from 'src/api/api';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { PageContent } from 'src/components/PageContent';
import { UserAvatar } from 'src/components/UserAvatar/UserAvatar';
import { UserProfileRouteParams } from 'src/routes';
import { useCurrentUser } from 'src/contexts/UserContext';
import styles from './UserProfilePage.module.scss';

enum UserProfileTabs {
    Posts = 'posts',
    Liked = 'liked',
}

export function UserProfilePage() {
    const { username } = useParams<UserProfileRouteParams>();
    const { user } = useCurrentUser();

    const { isLoading, data: fetchedUser } = useQuery({
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
                <h1>Profile</h1>
            </PageContent.Header>
            <PageContent.Body spinning={isLoading} className={styles.content}>
                <div className={styles.avatar}>
                    <UserAvatar user={fetchedUser} size={150} />
                </div>
                <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
                    <div className={styles.userInfoWrapper}>
                        <div className={styles.userInfo}>
                            <div>
                                <div className={styles.caption}>Username</div>
                                <span>{fetchedUser?.username}</span>
                            </div>
                            <div>
                                <div className={styles.caption}>Email</div>
                                <span>{fetchedUser?.userInfo.email}</span>
                            </div>
                            <div>
                                <div className={styles.caption}>Full name</div>
                                <span>{fetchedUser?.userInfo.fullName}</span>
                            </div>
                            <div>
                                <div className={styles.caption}>Gender</div>
                                <span>{fetchedUser?.userInfo.gender}</span>
                            </div>
                            <div>
                                <div className={styles.caption}>Following</div>
                                <span>0</span>
                            </div>
                            <div>
                                <div className={styles.caption}>Following</div>
                                <span>0</span>
                            </div>
                        </div>
                        {user?.username !== username && (
                            <Button type='primary' htmlType='submit' style={{ width: 150 }}>
                                Follow
                            </Button>
                        )}
                    </div>

                    <Tabs defaultActiveKey={UserProfileTabs.Posts} items={tabItems} />
                </Space>
            </PageContent.Body>
        </PageContent>
    );
}
