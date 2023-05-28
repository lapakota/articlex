import { NavLink } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { FeedRoute } from 'src/routes';

export function NotFoundPage() {
    return (
        <div className={styles.page}>
            <span className={styles.notFoundCaption}>404 not found</span>
            <NavLink to={FeedRoute.getHref()}>Go to feed page</NavLink>
        </div>
    );
}
