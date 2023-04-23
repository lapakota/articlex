import { UserOutlined, SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Space, theme } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserSettingsRoute } from 'src/routes';

const menuItems: MenuProps['items'] = [
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
        onClick: () => {
            // TODO Сделать выход из аккаунта
            console.log('fake logout');
        },
    },
];

// TODO Показывать аватарку пользователя
export function UserAvatar() {
    const {
        token: { colorBgLayout },
    } = theme.useToken();

    return (
        <Dropdown menu={{ items: menuItems }}>
            <Space wrap size={16}>
                <Avatar
                    size='large'
                    icon={<UserOutlined />}
                    style={{ backgroundColor: colorBgLayout, color: '#001529' }}
                />
            </Space>
        </Dropdown>
    );
}
