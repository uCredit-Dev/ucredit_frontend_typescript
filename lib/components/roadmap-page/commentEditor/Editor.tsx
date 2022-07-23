import React, { useState, useRef, useEffect } from 'react';

interface Props {
  addComments: (newComment: string) => void;
  closeEditor: () => void;
}

const Editor: React.FC<Props> = ({ addComments, closeEditor }) => {
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
    <div className="z-50 bottom-0 absolute font-['Futura']" ref={divEditorRef}>
      <textarea
        value={text}
        className="shadow-slate-400 h-48 rounded-lg w-screen resize-none px-10 pt-8 text-xl"
        placeholder="comment here..."
        onChange={(e) => setText(e.target.value)}
        onFocus={function (e) {
          var val = e.target.value;
          e.target.value = '';
          e.target.value = val;
        }}
      />

      <button
        className="absolute bottom-8 left-10 bg-[#0C3A76] text-[#C6E8FF] text-lg sm:w-auto px-4 py-1 hover:text-[#0C3A76] hover:bg-[#C6E8FF] rounded-[20px] transition duration-100 ease-in"
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
