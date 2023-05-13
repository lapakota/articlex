import { PageContent } from 'src/components/PageContent';

import styles from './ArticlePage.module.scss';

export function ArticlePage() {
    return (
        <PageContent>
            <PageContent.Header>
                <h1>Article</h1>
            </PageContent.Header>
            <PageContent.Body className={styles.content}>article here</PageContent.Body>
        </PageContent>
    );
}
