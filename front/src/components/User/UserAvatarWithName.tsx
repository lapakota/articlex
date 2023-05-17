import { User } from 'src/api/contracts';
import { UserAvatar } from './UserAvatar';
import { UserProfileRoute } from 'src/routes';
import { useNavigate } from 'react-router-dom';
import { Skeleton, Space } from 'antd';

interface UserAvatarWithNameProps {
    user: User | undefined;
}

export function UserAvatarWithName({ user }: UserAvatarWithNameProps) {
    const navigate = useNavigate();

    const onRedirectToUserPage = () => {
        if (!user) return;

        navigate(UserProfileRoute.getHref(user.username));
    };

    return (
        <>
            {user ? (
                <div onClick={onRedirectToUserPage}>
                    <UserAvatar user={user} /> {user.username}
                </div>
            ) : (
                <Space>
                    <Skeleton.Avatar active size={'large'} shape={'circle'} />
                    <Skeleton.Input active size='small' />
                </Space>
            )}
        </>
    );
}
