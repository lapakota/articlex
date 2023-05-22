import { UserAvatar } from './UserAvatar';
import { UserProfileRoute } from 'src/routes';
import { useNavigate } from 'react-router-dom';
import { Skeleton, Space } from 'antd';

interface UserAvatarWithNameProps {
    username: string | undefined;
    avatar: string | undefined;
    position?: 'right' | 'left';
    className?: string;
}

export function UserAvatarWithName({ username, avatar, position = 'right', className }: UserAvatarWithNameProps) {
    const navigate = useNavigate();

    const onRedirectToUserPage = () => {
        if (!username) return;

        navigate(UserProfileRoute.getHref(username));
    };

    const skeleton = (
        <Space>
            <Skeleton.Input active size='small' />
            <Skeleton.Avatar active size={'large'} shape={'circle'} />
        </Space>
    );

    if (position === 'right')
        return (
            <>
                {username ? (
                    <div className={className} onClick={onRedirectToUserPage} style={{ cursor: 'pointer' }}>
                        <UserAvatar avatar={avatar} /> {username}
                    </div>
                ) : (
                    skeleton
                )}
            </>
        );

    if (position === 'left')
        return (
            <>
                {username ? (
                    <div className={className} onClick={onRedirectToUserPage} style={{ cursor: 'pointer' }}>
                        {username} <UserAvatar avatar={avatar} />
                    </div>
                ) : (
                    skeleton
                )}
            </>
        );

    return null;
}
