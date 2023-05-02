import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/api/api';
import { SignInCredentialsDto } from 'src/api/contracts';
import { UserContext } from 'src/contexts/UserContext';
import { UserProfileRoute } from 'src/routes';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

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

    return (
        <Form {...layout} form={form} name='control-hooks' onFinish={onFinish} style={{ maxWidth: 600 }}>
            <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                <Input type='password' />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    Sign in
                </Button>
            </Form.Item>
        </Form>
    );
}
