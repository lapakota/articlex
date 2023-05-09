import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/api/api';
import { SignInCredentialsDto, SignInResponseDto, User } from 'src/api/contracts';
import { AuthRoute, FeedRoute } from 'src/routes';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { passwordValidationRules, usernameValidationRules } from 'src/helpers/validations/auth.validations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { MessageInstance } from 'antd/es/message/interface';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';
import styles from './Forms.module.scss';

interface SignInFromProps {
    messageApi: MessageInstance;
}

export function SignInForm({ messageApi }: SignInFromProps) {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: onFinish } = useMutation({
        mutationFn: (request: SignInCredentialsDto) => api.auth.signin(request).then((x) => x.data),
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Error with signing in, please try again',
            });
        },
        onSuccess: (response: SignInResponseDto) => {
            queryClient.setQueryData<User>(reactQueryHelper.getAuthenticatedUserKey(), () => response.user);
            queryClient.setQueryData<User>(reactQueryHelper.getUserKey(response.user.username), () => response.user);

            navigate(FeedRoute.getHref());
        },
    });

    const onRedirectToSignUp = () => {
        navigate(AuthRoute.getHref('signup'));
    };

    return (
        <Form className={styles.form} layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item>
                <h2 className={styles.formHeader}>Sign in</h2>
            </Form.Item>
            <Form.Item name='username' label='Username' rules={usernameValidationRules}>
                <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name='password' label='Password' hasFeedback rules={passwordValidationRules}>
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                    Sign in
                </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }} className={styles.formFooter}>
                <Button type='link' onClick={onRedirectToSignUp}>
                    Want to create new account?
                </Button>
            </Form.Item>
        </Form>
    );
}
