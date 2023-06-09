import { SettingOutlined, ExclamationCircleOutlined, ProfileOutlined, BookOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Spin } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from 'src/api/api';
import { useAuthenticatedUser } from 'src/contexts/UserContext';
import { AuthRoute, FeedRoute, UserProfileRoute, UserSettingsRoute } from 'src/routes';
import { UserAvatarWithName } from 'src/components/User/UserAvatarWithName';
import styles from './Layout.module.scss';

export function UserDropdown() {
    const { user } = useAuthenticatedUser();

    const navigate = useNavigate();

    const onLogout = () => {
        api.auth.logout();
        navigate(AuthRoute.getHref('signin'));
    };

    const menuItems: MenuProps['items'] = [
        {
            key: 'feed',
            label: <NavLink to={FeedRoute.getHref()}>Feed</NavLink>,
            icon: <BookOutlined size={32} />,
        },
        {
            key: 'profile',
            label: <NavLink to={UserProfileRoute.getHref(user?.username || '')}>Profile</NavLink>,
            icon: <ProfileOutlined size={32} />,
        },
        {
            key: 'settings',
            label: <NavLink to={UserSettingsRoute.getHref()}>Settings</NavLink>,
            icon: <SettingOutlined size={32} />,
        },
        {
            key: 'logout',
            danger: true,
            label: 'Logout',
            icon: <ExclamationCircleOutlined />,
            onClick: onLogout,
        },
    ];

    if (!user) return <Spin spinning size='small' />;

    return (
        <Dropdown menu={{ items: menuItems }} mouseEnterDelay={0}>
            <div>
                <UserAvatarWithName
                    className={styles.userDropdown}
                    username={user.username}
                    avatar={user.userInfo.avatar}
                    position='left'
                />
            </div>
        </Dropdown>
    );
}
