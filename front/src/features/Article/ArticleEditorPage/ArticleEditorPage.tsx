import { Editor } from '../Editor';
import { PageContent } from 'src/components/PageContent';
import { Button, Form, Input, Upload, UploadFile } from 'antd';
import { useCallback, useRef } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useMessageToast } from 'src/contexts/MessageToastContext';
import { useMutation } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { ArticleDto } from 'src/api/contracts';
import { getAxiosErrorMessage } from 'src/helpers/errors.helper';
import {
    articleCoverRules,
    articleDescriptionRules,
    articleTitleRules,
} from 'src/helpers/validations/articles.validations';
import { OutputData } from '@editorjs/editorjs';
import { useNavigate } from 'react-router-dom';
import { FeedRoute } from 'src/routes';
import { normFile } from 'src/helpers/files.helper';
import { PlusOutlined } from '@ant-design/icons';
import cn from 'classnames';
import styles from './ArticleEditorPage.module.scss';

type FormState = Omit<ArticleDto, 'body' | 'cover'> & { cover: UploadFile[] };

export function ArticleEditorPage() {
    const [form] = Form.useForm();
    const coverValue: any[] = Form.useWatch('cover', form);

    const { messageApi } = useMessageToast();
    const navigate = useNavigate();

    // TODO Редактирование статьи
    // const { articleId } = useParams<ArticleEditorRouteParams>();
    const editorCore = useRef(null);

    const handleInitialize = useCallback((instance: any) => {
        editorCore.current = instance;
    }, []);

    const { mutate: postNewArticle } = useMutation({
        mutationFn: (request: ArticleDto) => api.article.postNewArticle(request).then((x) => x.data),
        onError: (error) => {
            messageApi?.open({
                type: 'error',
                content: getAxiosErrorMessage(error) || 'Error with posting article, please try again',
            });
        },
        onSuccess: () => {
            messageApi?.open({
                type: 'success',
                content: 'Successfully posted new article!',
                duration: 2,
            });
            navigate(FeedRoute.getHref());
        },
    });

    const onFinish = async (formValues: FormState) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const editorData: OutputData = await editorCore?.current?.save();
        const body = JSON.stringify(editorData);
        const cover = (formValues.cover[0]?.response?.photo as string) || '';

        const request: ArticleDto = { title: formValues.title, description: formValues.description, body, cover };
        postNewArticle(request);
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
                    rules={articleCoverRules}
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
                    <Editor onInitialize={handleInitialize} autofocus />
                </PageContent.Body>
                <PageContent.Footer>
                    <Form.Item className={styles.formItem}>
                        <Button disabled={!editorCore} type='primary' htmlType='submit'>
                            Post article
                        </Button>
                    </Form.Item>
                </PageContent.Footer>
            </Form>
        </PageContent>
    );
}
