import React, { useState } from "react";
import CommentIcon from "../lib/components/roadmap-page/commentEditor/CommentIcon";
import Editor from "../lib/components/roadmap-page/commentEditor/Editor";


const RoadMap: React.FC = () => {
  const [editorPopup, setEditorPopup] = useState(false);
  const [comments, setComments] = useState<string[]>([]);

  
  const openEditor = () => {
    setEditorPopup(true);
  }

  const closeEditor = () => {
    setEditorPopup(false);
  }


  const addComments = (newComment: string) => {
    setComments([...comments, newComment]);
  }

  return (
    <>
      <div className="absolute bottom-10 right-10">
        <CommentIcon openEditor={openEditor}/>
      </div>

      <div>
        {editorPopup && <Editor addComments={addComments} closeEditor={closeEditor}/>}
      </div>
      
    </>
  )
}

export default RoadMap;
