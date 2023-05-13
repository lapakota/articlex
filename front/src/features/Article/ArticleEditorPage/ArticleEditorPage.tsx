import { Editor } from './Editor';
import styles from './ArticleEditorPage.module.scss';
import { PageContent } from 'src/components/PageContent';
import { Button, Form, Input } from 'antd';
import { useCallback, useRef } from 'react';

export function ArticleEditorPage() {
    const [form] = Form.useForm();
    const editorCore = useRef(null);

    const handleInitialize = useCallback((instance: any) => {
        editorCore.current = instance;
    }, []);

    const handleSave = useCallback(async () => {
        const savedData = await editorCore?.current?.save();
        console.log(savedData);
    }, []);

    const onFinish = (values: any) => {
        console.log(values);
        handleSave();
        // pass
    };

    return (
        <Form className={styles.form} layout='vertical' form={form} onFinish={onFinish}>
            <PageContent>
                <PageContent.Header></PageContent.Header>
                <Form.Item name='title' label='Title'>
                    <Input />
                </Form.Item>
                <Form.Item name='description' label='Description'>
                    <Input />
                </Form.Item>
                <PageContent.Body className={styles.content}>
                    <Editor onInitialize={handleInitialize} />
                </PageContent.Body>
                <PageContent.Footer>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                            Finish
                        </Button>
                    </Form.Item>
                </PageContent.Footer>
            </PageContent>
        </Form>
    );
}
