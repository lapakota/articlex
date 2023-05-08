import { useQuery } from '@tanstack/react-query';
import { Space } from 'antd';
import { useParams } from 'react-router-dom';
import { api } from 'src/api/api';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { PageContent } from 'src/components/PageContent';
import { UserAvatar } from 'src/components/UserAvatar/UserAvatar';
import { UserProfileRouteParams } from 'src/routes';

export function UserProfilePage() {
    const { username } = useParams<UserProfileRouteParams>();

    const { isLoading, data: user } = useQuery({
        queryKey: reactQueryHelper.getUserKey(username),
        queryFn: () => api.user.getUserByName(username || '').then((x) => x.data),
    });

    return (
        <PageContent>
            <PageContent.Header>
                <h1>Профиль</h1>
            </PageContent.Header>
            <PageContent.Body spinning={isLoading}>
                <Space direction='vertical' size={'middle'}>
                    <UserAvatar user={user} size={80} />
                    <span>{user?.username}</span>
                </Space>
            </PageContent.Body>
        </PageContent>
    );
}
