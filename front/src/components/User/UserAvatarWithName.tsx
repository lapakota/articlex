import { UserAvatar } from './UserAvatar';
import { UserProfileRoute } from 'src/routes';
import { useNavigate } from 'react-router-dom';
import { Skeleton, Space } from 'antd';

interface UserAvatarWithNameProps {
    username: string | undefined;
    avatar: string | undefined;
    position?: 'right' | 'left';
}

export function UserAvatarWithName({ username, avatar, position = 'right' }: UserAvatarWithNameProps) {
    const navigate = useNavigate();

    const onRedirectToUserPage = () => {
        if (!username) return;

        navigate(UserProfileRoute.getHref(username));
    };

    if (position === 'right')
        return (
            <>
                {username ? (
                    <div onClick={onRedirectToUserPage}>
                        <UserAvatar avatar={avatar} /> {username}
                    </div>
                ) : (
                    <Space>
                        <Skeleton.Avatar active size={'large'} shape={'circle'} />
                        <Skeleton.Input active size='small' />
                    </Space>
                )}
            </>
        );

    if (position === 'left')
        return (
            <>
                {username ? (
                    <div onClick={onRedirectToUserPage}>
                        {username} <UserAvatar avatar={avatar} />
                    </div>
                ) : (
                    <Space>
                        <Skeleton.Input active size='small' />
                        <Skeleton.Avatar active size={'large'} shape={'circle'} />
                    </Space>
                )}
            </>
        );

    return null;
}
