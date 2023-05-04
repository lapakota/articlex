import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/api/api';
import { SignInCredentialsDto } from 'src/api/contracts';
import { UserContext } from 'src/contexts/UserContext';
import { AuthRoute, UserProfileRoute } from 'src/routes';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { passwordValidationRules, usernameValidationRules } from '../auth.validations';
import styles from '../AuthPage.module.scss';

export function SignInForm() {
    const [form] = Form.useForm();

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onFinish = async (values: SignInCredentialsDto) => {
        try {
            const response = (await api.auth.signin(values)).data;

            setUser(response.user);
            navigate(UserProfileRoute.getHref(response.user.username));
        } catch (error) {
            console.log(axios.isAxiosError(error) && error.response?.statusText);
        }
    };

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
