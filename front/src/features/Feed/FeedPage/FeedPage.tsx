import { PageContent } from 'src/components/PageContent';
import styles from './FeedPage.module.scss';

export function FeedPage() {
    return (
        <PageContent>
            <PageContent.Header>
                <h1>Posts</h1>
            </PageContent.Header>
            <PageContent.Body className={styles.content}>feed here</PageContent.Body>
        </PageContent>
    );
}
