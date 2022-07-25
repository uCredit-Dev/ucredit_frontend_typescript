import Editor from './Editor';
import CommentIcon from './CommentIcon';
import React, { FC, useState } from 'react';
import clsx from 'clsx';

const EditorSection: FC = () => {
  const [editorPopup, setEditorPopup] = useState(false);
  const [comments, setComments] = useState<string[]>([]);

  const toggleEditor = () => {
    setEditorPopup(!editorPopup);
  };

  const addComments = (newComment: string) => {
    setComments([...comments, newComment]);
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
            addComments={addComments}
            toggleEditor={toggleEditor}
            editorPopup={editorPopup}
          />
        </div>
      }
    </div>
  );
};

export default EditorSection;
