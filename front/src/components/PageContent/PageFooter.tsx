import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './PageContent.module.scss';

interface PageFooterProps {
    className?: string;
}

export function PageFooter({ className, children }: PropsWithChildren<PageFooterProps>) {
    return (
        <div className={cn(className, styles.footer)} data-tid='PageFooter'>
            {children}
        </div>
    );
}
