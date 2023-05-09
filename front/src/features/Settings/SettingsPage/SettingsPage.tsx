import { Button, Form, Input, Select, Space, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { PageContent } from 'src/components/PageContent';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import { UserAvatar } from 'src/components/UserAvatar/UserAvatar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUserInfoDto, User } from 'src/api/contracts';
import { api } from 'src/api/api';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';
import {
    emailValidationRules,
    fullNameValidationRules,
    genderValidationRules,
} from 'src/helpers/validations/auth.validations';
import styles from './SettingsPage.module.scss';
import { reactQueryHelper } from 'src/api/reactQuery.helper';

export function SettingsPage() {
    const [form] = Form.useForm();
    const [messageApi, messageContextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const { user } = useContext(UserContext);

    const { mutate: onFinish } = useMutation({
        mutationFn: (request: UpdateUserInfoDto) => api.user.updateUserInfo(request).then((x) => x.data),
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Error with updating user info, please try again',
            });
        },
        onSuccess: (updatedUser: User) => {
            queryClient.setQueryData<User>(reactQueryHelper.getAuthenticatedUserKey(), () => updatedUser);
            queryClient.setQueryData<User>(reactQueryHelper.getUserKey(updatedUser.username), () => updatedUser);

            messageApi.open({
                type: 'success',
                content: 'User information was successfully updated!',
                duration: 2,
            });
        },
    });

    const onResetFields = () => {
        form.resetFields();
    };

    const defaultFormValue = {
        email: user?.userInfo.email,
        fullName: user?.userInfo.fullName,
        gender: user?.userInfo.gender,
    };

    return (
        <PageContent>
            {messageContextHolder}
            <PageContent.Header>
                <h1>Settings</h1>
            </PageContent.Header>
            <PageContent.Body spinning={!user} className={styles.content}>
                {user && (
                    <Form
                        className={styles.form}
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                        initialValues={defaultFormValue}
                    >
                        <Form.Item className={styles.avatar}>
                            {/* TODO Сделать загрузку аватарки */}
                            <UserAvatar user={user} size={128} />
                        </Form.Item>
                        <Form.Item name='email' label='Email' rules={emailValidationRules}>
                            <Input prefix={<MailOutlined />} />
                        </Form.Item>
                        <Form.Item name='fullName' label='Full name' rules={fullNameValidationRules}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='gender' label='Gender' rules={genderValidationRules}>
                            <Select>
                                <Select.Option value='male'>Male</Select.Option>
                                <Select.Option value='female'>Female</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Space direction='horizontal' size={'small'}>
                                <Button type='primary' htmlType='submit' style={{ width: 80 }}>
                                    Save
                                </Button>
                                <Button htmlType='button' onClick={onResetFields} style={{ width: 80 }}>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                )}
            </PageContent.Body>
        </PageContent>
    );
}
