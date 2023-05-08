import { PropsWithChildren } from 'react';
import { PageHeader } from './PageHeader';
import { PageBody } from './PageBody';
import { PageFooter } from './PageFooter';

import styles from './PageContent.module.scss';

export function PageContent({ children }: PropsWithChildren) {
    return <div className={styles.content} data-tid='PageContent'>{children}</div>;
}

PageContent.Footer = PageFooter;
PageContent.Body = PageBody;
PageContent.Header = PageHeader;
