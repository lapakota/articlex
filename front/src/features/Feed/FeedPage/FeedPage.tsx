import { PageContent } from 'src/components/PageContent';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { ArticleCard } from 'src/features/Article';
import { Space } from 'antd';
import styles from './FeedPage.module.scss';

export function FeedPage() {
    // TODO Здесь передавать skip, take и остальные фильтры сделать
    const { isLoading, data: feed } = useQuery({
        queryKey: reactQueryHelper.getFeedKey({}),
        queryFn: () => api.article.getArticlesFeed({}).then((x) => x.data),
    });

    return (
        <PageContent>
            <PageContent.Body className={styles.content} active={isLoading}>
                {!isLoading && (!feed || feed?.content.length === 0) && (
                    <span>No articles was found by your request</span>
                )}
                <Space direction='vertical' size='middle' style={{ width: '100%', padding: '8px 64px' }}>
                    {feed?.content.map((article) => (
                        <ArticleCard key={article.id} articleInfo={article} />
                    ))}
                </Space>
            </PageContent.Body>
        </PageContent>
    );
}
