import { Button } from 'antd';
import { ArticleEditorRoute } from 'src/routes';
import { useNavigate } from 'react-router-dom';
import styles from './FeedFilters.module.scss';

export function FeedFilters() {
    const navigate = useNavigate();

    const onRedirectToArticleEditor = () => {
        navigate(ArticleEditorRoute.getHref());
    };

    return (
        <div className={styles.feedFilters}>
            <div>filters here</div>
            <Button type='default' onClick={onRedirectToArticleEditor} size='large'>
                Write new article
            </Button>
        </div>
    );
}
