import { Editor } from '../Editor';
import { PageContent } from 'src/components/PageContent';
import { Button, Form, Input, Upload, UploadFile } from 'antd';
import { useEffect, useRef } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useMessageToast } from 'src/contexts/MessageToastContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { Article, ArticleDto } from 'src/api/contracts';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';
import {
    articleCoverRules,
    articleDescriptionRules,
    articleEditingCoverRules,
    articleTitleRules,
} from 'src/helpers/validations/articles.validations';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleEditorRouteParams } from 'src/routes';
import { normFile } from 'src/helpers/files.helper';
import { PlusOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { ArticleBody } from 'src/types/ArticleBody';
import { reactQueryHelper } from 'src/api/reactQuery.helper';
import styles from './ArticleEditorPage.module.scss';

type FormState = Omit<ArticleDto, 'body' | 'cover'> & { cover: UploadFile[] };

export function ArticleEditorPage() {
    const { articleId } = useParams<ArticleEditorRouteParams>();
    const { messageApi } = useMessageToast();
    const navigate = useNavigate();
    const editorCore = useRef(null);
    const queryClient = useQueryClient();

    const [form] = Form.useForm();
    const coverValue: any[] = Form.useWatch('cover', form);

    const { isFetched, data: articleInitialInfo } = useQuery({
        queryKey: reactQueryHelper.getArticleKey(articleId),
        queryFn: () => api.article.getArticleById(articleId || '').then((x) => x.data),
        enabled: Boolean(articleId),
    });

    const { mutate: createOrUpdateArticle } = useMutation({
        mutationFn: (request: ArticleDto) =>
            articleId
                ? api.article.updateArticle(articleId, request).then((x) => x.data)
                : api.article.postNewArticle(request).then((x) => x.data),
        onError: (error) => {
            messageApi?.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Error with posting article, please try again',
            });
        },
        onSuccess: (response: Article) => {
            articleId && queryClient.setQueryData<Article>(reactQueryHelper.getArticleKey(articleId), () => response);

            messageApi?.open({
                type: 'success',
                content: 'Successfully posted new article!',
                duration: 2,
            });
            navigate(-1);
        },
    });

    useEffect(() => {
        if (!articleInitialInfo) return;

        form.setFieldValue('title', articleInitialInfo.title);
        form.setFieldValue('description', articleInitialInfo.description);
    }, [articleInitialInfo]);

    // TODO very bad api in react-editor-js
    useEffect(() => {
        if (!articleInitialInfo) return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        editorCore.current?._editorJS?.isReady.then(() => editorCore.current?.render(articleInitialInfo.body));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    }, [articleInitialInfo, editorCore.current?._editorJS?.isReady]);

    const onFinish = async (formValues: FormState) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const editorData: ArticleBody = await editorCore?.current?.save();
        const cover = formValues.cover ? (formValues.cover[0]?.response?.photo as string) : '';

        const request: ArticleDto = {
            title: formValues.title,
            description: formValues.description,
            body: editorData,
            cover,
        };
        createOrUpdateArticle(request);
    };

    const handleInitializeEditor = (instance: any) => {
        editorCore.current = instance;
    };

    return (
        <PageContent>
            <Form className={styles.form} layout='vertical' form={form} onFinish={onFinish}>
                <PageContent.Header withBackButton>
                    <h1>Article editor</h1>
                </PageContent.Header>
                <Form.Item
                    className={cn(styles.formItem, styles.cover)}
                    name='cover'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    shouldUpdate
                    rules={articleId ? articleEditingCoverRules : articleCoverRules}
                >
                    <Upload
                        className={styles.avatar}
                        accept='.png, .jpg, .jpeg'
                        action='/api/photos/upload'
                        listType='picture-card'
                        maxCount={1}
                        multiple={false}
                    >
                        {(!coverValue || !coverValue.length) && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8, fontSize: 12 }}>Add article cover</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item className={styles.formItem} name='title' rules={articleTitleRules}>
                    <Input className={styles.control} placeholder='Enter article name' />
                </Form.Item>
                <Form.Item className={styles.formItem} name='description' rules={articleDescriptionRules}>
                    <TextArea
                        className={styles.control}
                        placeholder='Enter article description'
                        autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                </Form.Item>
                <div className={styles.separatorWrapper}>
                    <div className={styles.separator} />
                </div>
                <PageContent.Body className={styles.content}>
                    <Editor
                        onInitialize={handleInitializeEditor}
                        autofocus
                        placeholder={'Let`s write an awesome story!'}
                    />
                </PageContent.Body>
                <PageContent.Footer>
                    <Form.Item className={styles.formItem}>
                        {articleId ? (
                            <Button disabled={!editorCore || !isFetched} type='default' htmlType='submit' size='large'>
                                Update article
                            </Button>
                        ) : (
                            <Button disabled={!editorCore} type='default' htmlType='submit' size='large'>
                                Post article
                            </Button>
                        )}
                    </Form.Item>
                </PageContent.Footer>
            </Form>
        </PageContent>
    );
}
