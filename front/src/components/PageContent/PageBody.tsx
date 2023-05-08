import { CSSProperties, PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './PageContent.module.scss';
import { Spin, SpinProps } from 'antd';

interface PageBodyProps extends SpinProps {
    className?: string;
    style?: CSSProperties;
}

export function PageBody({ className, style, children, ...spinProps }: PropsWithChildren<PageBodyProps>) {
    return (
        <Spin size='large' delay={200} {...spinProps} className={styles.bodyLoader}>
            <div style={style} className={cn(className, styles.body)} data-tid='PageBody'>
                {children}
            </div>
        </Spin>
    );
}
