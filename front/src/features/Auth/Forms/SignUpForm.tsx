import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/api/api';
import { SignUpCredentialsDto } from 'src/api/contracts';
import { AuthRoute } from 'src/routes';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import {
    emailValidationRules,
    fullNameValidationRules,
    genderValidationRules,
    passwordValidationRules,
    usernameValidationRules,
} from 'src/helpers/validations/auth.validations';
import { useMutation } from '@tanstack/react-query';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';
import { useMessageToast } from 'src/contexts/MessageToastContext';
import styles from './Forms.module.scss';

interface SignUpFormState extends SignUpCredentialsDto {
    confirmPassword: string;
}

export function SignUpForm() {
    const [form] = Form.useForm();
    const { messageApi } = useMessageToast();

    const navigate = useNavigate();

    const onRedirectToSignIn = () => {
        navigate(AuthRoute.getHref('signin'));
    };

    const { mutate: onFinish } = useMutation({
        mutationFn: (formValues: SignUpFormState) => {
            const request: SignUpCredentialsDto = {
                username: formValues.username,
                password: formValues.password,
                email: formValues.email,
                fullName: formValues.fullName,
                gender: formValues.gender,
            };

            return api.auth.signup(request).then((x) => x.data);
        },
        onError: (error) => {
            messageApi?.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Error with registration, please try again',
            });
        },
        onSuccess: () => {
            messageApi?.open({
                type: 'success',
                content: 'Your account was successfully created',
            });
            onRedirectToSignIn();
        },
    });

    return (
        <Form className={styles.form} layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item>
                <h2 className={styles.formHeader}>Sign up</h2>
            </Form.Item>
            <Form.Item name='username' label='Username' rules={usernameValidationRules}>
                <Input prefix={<UserOutlined />} />
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
