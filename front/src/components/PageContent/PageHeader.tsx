import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import cn from 'classnames';
import styles from './PageContent.module.scss';

interface PageHeaderProps {
    withBackButton?: boolean;
    scrollToHeader?: boolean;
}

export function PageHeader({
    withBackButton = false,
    scrollToHeader = true,
    children,
}: PropsWithChildren<PageHeaderProps>) {
    const navigate = useNavigate();

    useEffect(() => {
        if (scrollToHeader) {
            window.scrollTo({ top: 0 });
        }
    }, [scrollToHeader]);

    const handleGoBack = () => {
        if (withBackButton) {
            navigate(-1);
        }
    };

    return (
        <div className={cn(styles.header)}>
            {withBackButton && (
                <button className={styles.backButton} onClick={handleGoBack} data-tid='BackButton'>
                    <ArrowLeftOutlined /> Back
                </button>
            )}
            <div className={styles.headerChild}>{children}</div>
        </div>
    );
}
