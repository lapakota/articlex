import { Layout as AntdLayout, message } from 'antd';
import styles from './AuthPage.module.scss';
import { useParams } from 'react-router-dom';
import { AuthRouteParams } from 'src/routes';
import { SignInForm, SignUpForm } from '..';

const { Content, Footer } = AntdLayout;

export function AuthPage() {
    const { authType } = useParams<AuthRouteParams>();

    const [messageApi, messageContextHolder] = message.useMessage();

    return (
        <AntdLayout className={styles.layout}>
            {messageContextHolder}
            <Content className={styles.content}>
                {authType === 'signup' ? (
                    <SignUpForm messageApi={messageApi} />
                ) : (
                    <SignInForm messageApi={messageApi} />
                )}
            </Content>
            <Footer className={styles.footer}>articlex ©2023</Footer>
        </AntdLayout>
    );
}