import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import cn from 'classnames';
import styles from './PageContent.module.scss';

interface PageHeaderProps {
    onBack?: () => void;
    scrollToHeader?: boolean;
}

export function PageHeader({ onBack, scrollToHeader = true, children }: PropsWithChildren<PageHeaderProps>) {
    const navigate = useNavigate();

    useEffect(() => {
        if (scrollToHeader) {
            window.scrollTo({ top: 0 });
        }
    }, [scrollToHeader]);

    const handleGoBack = useCallback(() => {
        if (onBack) {
            try {
                navigate(-1);
            } catch (e) {
                onBack();
            }
        }
    }, [onBack, navigate]);

    return (
        <div className={cn(styles.header)}>
            {onBack && (
                <button className={styles.backButton} onClick={handleGoBack} data-tid='BackButton'>
                    <ArrowLeftOutlined /> Назад
                </button>
            )}
            {children}
        </div>
    );
}
