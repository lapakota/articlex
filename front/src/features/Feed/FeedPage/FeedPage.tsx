import { PageContent } from 'src/components/PageContent';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArticleEditorRoute } from 'src/routes';
import styles from './FeedPage.module.scss';

export function FeedPage() {
    const navigate = useNavigate();

    const onRedirectToArticleEditor = () => {
        navigate(ArticleEditorRoute.getHref(undefined));
    };

    return (
        <PageContent>
            <PageContent.Header>
                <div className={styles.headerWrapper}>
                    <Button type='primary' onClick={onRedirectToArticleEditor}>
                        Write new article
                    </Button>
                </div>
            </PageContent.Header>
            <PageContent.Body className={styles.content}>feed here</PageContent.Body>
        </PageContent>
    );
}