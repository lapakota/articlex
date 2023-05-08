import { Layout as AntdLayout } from 'antd';
import { SignInForm } from './SignInForm/SignInForm';
import styles from './AuthPage.module.scss';
import { useParams } from 'react-router-dom';
import { AuthRouteParams } from 'src/routes';
import { SignUpForm } from './SignUpForm/SignUpForm';

const { Content, Footer } = AntdLayout;

export function AuthPage() {
    const { authType } = useParams<AuthRouteParams>();

    return (
        <AntdLayout className={styles.layout}>
            <Content className={styles.content}>{authType === 'signup' ? <SignUpForm /> : <SignInForm />}</Content>
            <Footer className={styles.footer}>articlex ©2023</Footer>
        </AntdLayout>
    );
}
