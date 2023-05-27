import { PageContent } from 'src/components/PageContent';
import { Editor } from '../Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleEditorRoute, ArticleRouteParams } from 'src/routes';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { Button, Image, Space } from 'antd';
import { getImageLink } from 'src/helpers/images.helper';
import { UserAvatarWithName } from 'src/components/User/UserAvatarWithName';
import { useAuthenticatedUser } from 'src/contexts/UserContext';
import { useMessageToast } from 'src/contexts/MessageToastContext';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';
import styles from './ArticlePage.module.scss';

export function ArticlePage() {
    const { articleId } = useParams<ArticleRouteParams>();
    const { user } = useAuthenticatedUser();
    const { messageApi } = useMessageToast();
    const navigate = useNavigate();

    const { isLoading, data: article } = useQuery({
        queryKey: reactQueryHelper.getArticleKey(articleId),
        queryFn: () => api.article.getArticleById(articleId || '').then((x) => x.data),
    });

    const { data: articleCreator } = useQuery({
        queryKey: reactQueryHelper.getUserKey(article?.creator),
        queryFn: () => api.user.getUserByName(article?.creator || '').then((x) => x.data),
        enabled: Boolean(article?.creator),
    });

    const { mutate: deleteArticle } = useMutation({
        mutationFn: (id: string) => api.article.deleteArticle(id).then((x) => x.data),
        onError: (error) => {
            messageApi?.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Error with deleting article, please try again',
            });
        },
        onSuccess: () => {
            messageApi?.open({
                type: 'success',
                content: 'Article was successfully deleted!',
                duration: 2,
            });
            navigate(-1);
        },
    });

    const handleDeleteArticle = () => {
        if (!articleId) return;

        deleteArticle(articleId);
    };

    const handleRedirectToArticleEditing = () => {
        if (!articleId) return;

        navigate(ArticleEditorRoute.getHref(articleId));
    };

    const isAuthenticatedUserArticle = user?.username === articleCreator?.username;

    return (
        <PageContent>
            <PageContent.Header withBackButton>
                <h1>{article?.title}</h1>
            </PageContent.Header>
            <PageContent.Body className={styles.content} active={isLoading}>
                <Space size={'middle'} direction='vertical'>
                    <div className={styles.userPanel}>
                        {articleCreator && (
                            <div style={{ width: 650 }}>
                                <UserAvatarWithName
                                    username={articleCreator.username}
                                    avatar={articleCreator.userInfo.avatar}
                                />
                            </div>
                        )}
                        {isAuthenticatedUserArticle && (
                            <Space direction='horizontal' size='small'>
                                <Button type='default' onClick={handleRedirectToArticleEditing}>
                                    Edit article
                                </Button>
                                <Button type='default' danger onClick={handleDeleteArticle}>
                                    Delete article
                                </Button>
                            </Space>
                        )}
                    </div>
                    <Image width={650} height={300} style={{ objectFit: 'cover' }} src={getImageLink(article?.cover)} />
                    <div className={styles.description}>{article?.description}</div>
                    {article && <Editor defaultValue={article.body} readOnly />}
                </Space>
            </PageContent.Body>
        </PageContent>
    );
}
