import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/api/api';
import { SignUpCredentialsDto } from 'src/api/contracts';
import { AuthRoute } from 'src/routes';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { passwordValidationRules, usernameValidationRules } from '../auth.validations';
import styles from '../AuthPage.module.scss';

interface SignUpFormState extends SignUpCredentialsDto {
    confirmPassword: string;
}

export function SignUpForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onRedirectToSignIn = () => {
        navigate(AuthRoute.getHref('signin'));
    };

    const onFinish = async (values: SignUpFormState) => {
        try {
            const request: SignUpCredentialsDto = {
                username: values.username,
                password: values.password,
            };

            await api.auth.signup(request);

            onRedirectToSignIn();
        } catch (error) {
            console.log(axios.isAxiosError(error) && error.response?.statusText);
        }
    };

    return (
        <Form className={styles.form} layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item>
                <h2 className={styles.formHeader}>Sign up</h2>
            </Form.Item>
            <Form.Item name='username' label='Username' rules={usernameValidationRules}>
                <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name='password' label='Password' hasFeedback rules={passwordValidationRules}>
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item
                name='confirmPassword'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                    Sign up
                </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }} className={styles.formFooter}>
                <Button type='link' onClick={onRedirectToSignIn}>
                    Already has account?
                </Button>
            </Form.Item>
        </Form>
    );
}
