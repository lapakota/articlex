import { createReactEditorJS } from 'react-editor-js';
import { WrapperProps } from '@react-editor-js/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { EDITOR_TOOLS } from './tools';
import styles from './Editor.module.scss';

const ReactEditorJS = createReactEditorJS();

export function Editor({ ...props }: WrapperProps) {
    return (
        <ReactEditorJS holder='holder' tools={EDITOR_TOOLS} {...props}>
            <div className={styles.holder} id='holder' />
        </ReactEditorJS>
    );
}
