import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, theme } from 'antd';
import { AvatarSize } from 'antd/es/avatar/SizeContext';
import { User } from 'src/api/contracts';
import { getImageLink } from 'src/helpers/images.helper';

interface UserAvatarProps {
    user: User | undefined;
    size?: AvatarSize;
}

export function UserAvatar({ user, size }: UserAvatarProps) {
    const {
        token: { colorBgLayout },
    } = theme.useToken();

    return (
        <Space wrap>
            <Avatar
                size={size || 'large'}
                icon={<UserOutlined />}
                style={{ backgroundColor: colorBgLayout, color: '#001529' }}
                src={getImageLink(user?.userInfo.avatar)}
            />
        </Space>
    );
}
