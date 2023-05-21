import { PageContent } from 'src/components/PageContent';
import { Editor } from '../Editor';
import { useParams } from 'react-router-dom';
import { ArticleRouteParams } from 'src/routes';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { Image, Space } from 'antd';
import { getImageLink } from 'src/helpers/images.helper';
import { UserAvatarWithName } from 'src/components/User/UserAvatarWithName';
import styles from './ArticlePage.module.scss';

export function ArticlePage() {
    const { articleId } = useParams<ArticleRouteParams>();

    const { isLoading, data: article } = useQuery({
        queryKey: reactQueryHelper.getArticleKey(articleId),
        queryFn: () => api.article.getArticleById(articleId || '').then((x) => x.data),
    });

    const { data: articleCreator } = useQuery({
        queryKey: reactQueryHelper.getUserKey(article?.creator),
        queryFn: () => api.user.getUserByName(article?.creator || '').then((x) => x.data),
        enabled: Boolean(article?.creator),
    });

    return (
        <PageContent>
            <PageContent.Header withBackButton>
                <h1>{article?.title}</h1>
            </PageContent.Header>
            <PageContent.Body className={styles.content} active={isLoading}>
                <Space size={'middle'} direction='vertical'>
                    {articleCreator && (
                        <div style={{ width: 650, cursor: 'pointer' }}>
                            <UserAvatarWithName
                                username={articleCreator.username}
                                avatar={articleCreator.userInfo.avatar}
                            />
                        </div>
                    )}
                    <Image width={650} height={300} style={{ objectFit: 'cover' }} src={getImageLink(article?.cover)} />
                    <div className={styles.description}>{article?.description}</div>
                    {article && <Editor defaultValue={JSON.parse(article.body)} readOnly />}
                </Space>
            </PageContent.Body>
        </PageContent>
    );
}
