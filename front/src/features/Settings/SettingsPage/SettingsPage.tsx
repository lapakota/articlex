import { Button, Form, Input, Select, Space, Upload, UploadFile } from 'antd';
import { MailOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContent } from 'src/components/PageContent';
import { useCurrentUser } from 'src/contexts/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUserInfoDto, User } from 'src/api/contracts';
import { api } from 'src/api/api';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';
import {
    emailValidationRules,
    fullNameValidationRules,
    genderValidationRules,
} from 'src/helpers/validations/auth.validations';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { useMessageToast } from 'src/contexts/MessageToastContext';
import { normFile } from 'src/helpers/files.helper';
import styles from './SettingsPage.module.scss';

type FormState = Omit<UpdateUserInfoDto, 'avatar'> & { avatar?: UploadFile[] };

export function SettingsPage() {
    const [form] = Form.useForm();
    const avatarValue: any[] = Form.useWatch('avatar', form);

    const { messageApi } = useMessageToast();
    const queryClient = useQueryClient();

    const { user } = useCurrentUser();

    const { mutate: updateUserInfo } = useMutation({
        mutationFn: (request: UpdateUserInfoDto) => api.user.updateUserInfo(request).then((x) => x.data),
        onError: (error) => {
            messageApi?.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Error with updating user info, please try again',
            });
        },
        onSuccess: (updatedUser: User) => {
            queryClient.setQueryData<User>(reactQueryHelper.getAuthenticatedUserKey(), () => updatedUser);
            queryClient.setQueryData<User>(reactQueryHelper.getUserKey(updatedUser.username), () => updatedUser);

            messageApi?.open({
                type: 'success',
                content: 'User information was successfully updated!',
                duration: 2,
            });
        },
    });

    const onFinish = (values: FormState) => {
        const avatar = values.avatar ? (values.avatar[0]?.response?.photo as string) : undefined;

        const updateRequest = { ...values, avatar };
        updateUserInfo(updateRequest);
    };

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
            <PageContent.Header withBackButton>
                <h1>Settings</h1>
            </PageContent.Header>
            <PageContent.Body className={styles.content}>
                {user && (
                    <Form
                        className={styles.form}
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                        initialValues={defaultFormValue}
                    >
                        <Form.Item
                            className={styles.avatar}
                            name='avatar'
                            valuePropName='fileList'
                            getValueFromEvent={normFile}
                            shouldUpdate
                        >
                            <Upload
                                className={styles.avatar}
                                accept='.png, .jpg, .jpeg'
                                action='/api/photos/upload'
                                listType='picture-circle'
                                maxCount={1}
                                multiple={false}
                            >
                                {(!avatarValue || !avatarValue.length) && (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8, fontSize: 12 }}>Add new avatar</div>
                                    </div>
                                )}
                            </Upload>
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
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                )}
            </PageContent.Body>
        </PageContent>
    );
}
