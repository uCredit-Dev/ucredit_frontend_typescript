import React, { FC, useState, useRef, useEffect } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import clsx from 'clsx';

interface Props {
  addComments: (newComment: string) => void;
  toggleEditor: () => void;
  editorPopup: boolean
}

const Editor: FC<Props> = ({ addComments, toggleEditor, editorPopup }) => {
  const [text, setText] = useState('');

  return ( 
    <div 
    className={clsx("fixed bottom-0 z-50 w-[100%] h-60 font-['Futura'] transition-all duration-500 ease-in-out", {
      "translate-y-full" : !editorPopup
    })}> 
      <div className="absolute bottom-0 w-[100%]">
        <MdEditor
          modelValue={text}
          placeholder="comment here..."
          onChange={setText}
          toolbars={
            [
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
            ]
          }
          language="en-US"
        />
      </div>

      <button
        className="absolute bottom-10 left-5 bg-[#0C3A76] text-[#C6E8FF] text-lg sm:w-auto px-4 py-1 hover:text-[#0C3A76] hover:bg-[#C6E8FF] rounded-[20px] transition duration-100 ease-in"
        onClick={() => {
          addComments(text);
          setText('');
          toggleEditor();
        }}
      >
        send
      </button>
    </div>
    );
};

export default Editor;