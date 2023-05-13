import { Button, Modal } from 'antd';
import { useModal } from 'src/hooks/useModal';
import styles from './ArticleEditorModal.module.scss';

export function ArticleEditorModal() {
    const { opened, onOpenModal, onCloseModal } = useModal();

    const handleCancel = () => {
        onCloseModal();
    };

    const handleOk = () => {
        // pass
    };

    return (
        <>
            <Button type='primary' onClick={onOpenModal}>
                Write new article
            </Button>
            <Modal
                open={opened}
                title='New Article!'
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button key='submit' type='primary' onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
}
