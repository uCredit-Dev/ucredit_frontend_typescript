import React, { useState, useRef, useEffect } from 'react';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

interface Props {
  addComments: (newComment: string) => void;
  closeEditor: () => void;
  editorPopup: boolean
}

const Editor: React.FC<Props> = ({ addComments, closeEditor, editorPopup }) => {
  const [text, setText] = useState('');
  const divEditorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        divEditorRef.current &&
        !divEditorRef.current.contains(event.target)
      ) {
        closeEditor();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divEditorRef]);

  return (
    <div className="flex space-y-2 fixed bottom-0 z-50 w-[100%] h-60 font-['Futura']" ref={divEditorRef}>
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
        }}
      >
        send
      </button>
    </div>
  );
};

export default Editor;