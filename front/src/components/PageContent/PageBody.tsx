import { CSSProperties, PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './PageContent.module.scss';
import { Skeleton, SkeletonProps } from 'antd';

interface PageBodyProps extends SkeletonProps {
    className?: string;
    style?: CSSProperties;
}

export function PageBody({ className, style, children, ...skeletonProps }: PropsWithChildren<PageBodyProps>) {
    return (
        <>
            {!skeletonProps.active ? (
                <div style={style} className={cn(className, styles.body)} data-tid='PageBody'>
                    {children}
                </div>
            ) : (
                <Skeleton active={true} {...skeletonProps} />
            )}
        </>
    );
}
