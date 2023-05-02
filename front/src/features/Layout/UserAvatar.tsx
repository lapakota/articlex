import { UserOutlined, SettingOutlined, ExclamationCircleOutlined, ProfileOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Space, Spin, theme } from 'antd';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from 'src/api/api';
import { UserContext } from 'src/contexts/UserContext';
import { AuthRoute, UserProfileRoute, UserSettingsRoute } from 'src/routes';
import styles from './Layout.module.scss';

// TODO Показывать аватарку пользователя
export function UserAvatar() {
    const {
        token: { colorBgLayout },
    } = theme.useToken();
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const onLogout = () => {
        api.auth.logout();
        navigate(AuthRoute.baseRoute);
    };

    const menuItems: MenuProps['items'] = [
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
            <div style={{ cursor: 'pointer' }}>
                <span className={styles.username}>{user?.username}</span>
                <Space wrap size={16}>
                    <Avatar
                        size='large'
                        icon={<UserOutlined />}
                        style={{ backgroundColor: colorBgLayout, color: '#001529' }}
                        src={user?.user_info.modified_photo}
                    />
                </Space>
            </div>
        </Dropdown>
    );
}
