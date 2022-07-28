import Editor from './Editor';
import CommentIcon from './CommentIcon';
import React, { FC, useState } from 'react';
import clsx from 'clsx';

const EditorSection: FC<{
  contents: string;
  setContent;
  submit: any;
}> = ({ contents, setContent, submit }) => {
  const [editorPopup, setEditorPopup] = useState(false);

  const toggleEditor = () => {
    setEditorPopup(!editorPopup);
  };

  console.log(editorPopup);

  return (
    <div>
      <CommentIcon openEditor={toggleEditor} />
      {
        /*editorPopup && */ <div
          className={clsx('z-30 w-full', {
            invisible: !editorPopup,
          })}
        >
          <div
            onClick={toggleEditor}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          ></div>

          <Editor
            toggleEditor={toggleEditor}
            editorPopup={editorPopup}
            contents={contents}
            setContent={setContent}
            submit={submit}
          />
        </div>
      }
    </div>
  );
};

export default EditorSection;
