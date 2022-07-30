import React, { FC } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import clsx from 'clsx';

interface Props {
  toggleEditor: () => void;
  editorPopup: boolean;
  contents: string;
  setContent;
  submit: any;
}

const Editor: FC<Props> = ({
  toggleEditor,
  editorPopup,
  contents,
  setContent,
  submit,
}) => {
  return (
    <div
      className={clsx(
        "fixed bottom-0  left-0 z-50 w-[100%] h-[425px] font-['Futura'] transition-all duration-300 ease-in",
        {
          'translate-y-full': !editorPopup,
        },
      )}
    >
      <div className="absolute bottom-0 w-[100%]">
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

      <button
        className="absolute bottom-10 left-5 bg-[#0C3A76] text-[#C6E8FF] text-lg sm:w-auto px-4 py-1 hover:text-[#0C3A76] hover:bg-[#C6E8FF] rounded-[20px] transition duration-100 ease-in"
        onClick={() => {
          setContent('');
          toggleEditor();
          submit();
        }}
      >
        send
      </button>
    </div>
  );
};

export default Editor;
