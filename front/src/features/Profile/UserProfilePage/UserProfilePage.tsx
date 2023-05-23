import { useQuery } from '@tanstack/react-query';
import { Button, Skeleton, Space, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { api } from 'src/api/api';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { PageContent } from 'src/components/PageContent';
import { UserAvatar } from 'src/components/User/UserAvatar';
import { UserProfileRouteParams } from 'src/routes';
import { useCurrentUser } from 'src/contexts/UserContext';
import { ArticleCard } from 'src/features/Article';
import styles from './UserProfilePage.module.scss';

enum UserProfileTabs {
    Posts = 'posts',
    Liked = 'liked',
}

export function UserProfilePage() {
    const { username } = useParams<UserProfileRouteParams>();
    const { user: authenticatedUser } = useCurrentUser();

    const { isLoading: isUserLoading, data: fetchedUser } = useQuery({
        queryKey: reactQueryHelper.getUserKey(username),
        queryFn: () => api.user.getUserByName(username || '').then((x) => x.data),
    });

    const { isLoading: isArticlesLoading, data: fetchedArticlesData } = useQuery({
        queryKey: reactQueryHelper.getUserArticlesKey(username),
        queryFn: () => api.article.getArticlesByUsername(username || '').then((x) => x.data),
    });

    const isSubscribed = authenticatedUser?.userInfo.subscriptions.find((x) => x.subscribedUsername === username);

    // TODO Переписать на мутацию которая обновит состояние пользователя
    const handleSubscription = async () => {
        if (!username) return;

        if (isSubscribed) api.subscription.unsubscribe(username);
        else {
            api.subscription.subscribe(username);
        }
    };

    const tabItems = [
        {
            label: 'User posts',
            key: UserProfileTabs.Posts,
            children: (
                <>
                    {!isArticlesLoading ? (
                        <Space direction='vertical' size='middle' style={{ width: '100%', padding: '8px 64px' }}>
                            {fetchedArticlesData?.content.map((articleInfo) => (
                                <ArticleCard key={articleInfo.id} articleInfo={articleInfo} />
                            ))}
                        </Space>
                    ) : (
                        <Skeleton />
                    )}
                </>
            ),
        },
        {
            label: 'User liked',
            key: UserProfileTabs.Liked,
            children: 'User liked',
        },
    ];

    return (
        <PageContent>
            <PageContent.Header withBackButton>
                <h1>Profile</h1>
            </PageContent.Header>
            <PageContent.Body active={isUserLoading} className={styles.content}>
                <div className={styles.avatar}>
                    <UserAvatar avatar={fetchedUser?.userInfo.avatar} size={150} />
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
                            <div>
                                <div className={styles.caption}>Posts</div>
                                <span>{fetchedArticlesData?.totalCount}</span>
                            </div>
                        </div>
                        {authenticatedUser?.username !== username && (
                            <Button
                                type={isSubscribed ? 'default' : 'primary'}
                                htmlType='submit'
                                style={{ width: 150 }}
                                onClick={handleSubscription}
                            >
                                {isSubscribed ? 'Unfollow' : 'Follow'}
                            </Button>
                        )}
                    </div>

                    <Tabs defaultActiveKey={UserProfileTabs.Posts} items={tabItems} />
                </Space>
            </PageContent.Body>
        </PageContent>
    );
}
