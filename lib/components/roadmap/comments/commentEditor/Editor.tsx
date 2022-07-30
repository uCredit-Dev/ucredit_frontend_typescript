import React, { FC } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import clsx from 'clsx';

interface Props {
  contents: string;
  setContent;
}

const Editor: FC<Props> = ({ contents, setContent }) => {
  return (
    <div className={clsx("w-[100%] h-[100%] font-['Futura'] ")}>
      <div className="w-[100%]">
        <MdEditor
          modelValue={contents}
          placeholder="comment here..."
          onChange={setContent}
          toolbars={[
            'bold',
            'underline',
            'italic',
            '-',
            'strikeThrough',
            'sub',
            'sup',
            'quote',
            'unorderedList',
            'orderedList',
            '-',
            'codeRow',
            'code',
            'link',
            'image',
            'table',
            'katex',
            '-',
            'revoke',
            'next',
            'save',
            '=',
            'pageFullscreen',
            'fullscreen',
            'preview',
          ]}
          language="en-US"
        />
      </div>
    </div>
  );
};

export default Editor;
