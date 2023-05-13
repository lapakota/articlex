import { PageContent } from 'src/components/PageContent';
import { ArticleEditorModal } from 'src/features/Article';
import styles from './FeedPage.module.scss';

export function FeedPage() {
    return (
        <PageContent>
            <PageContent.Header>
                <h1>Feed</h1>
            </PageContent.Header>
            <PageContent.Body className={styles.content}>
                feed here
                <ArticleEditorModal />
            </PageContent.Body>
        </PageContent>
    );
}
