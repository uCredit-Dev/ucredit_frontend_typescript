import React, { useState } from "react";
import CommentIcon from "../lib/components/roadmap-page/commentEditor/CommentIcon";
import Editor from "../lib/components/roadmap-page/commentEditor/Editor";


const RoadMap: React.FC = () => {
  const [editorPopup, setEditorPopup] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  console.log(comments)

  const onClickBtn = () => {
    setEditorPopup(true);
  }

  const addComments = (newComment: string) => {
    setComments([...comments, newComment]);
  }
  
  return (
    <>
      <div className="absolute bottom-10 right-10">
        <CommentIcon onClickBtn={onClickBtn}/>
      </div>

      {editorPopup && <Editor addComments={addComments}/>}
      
    </>
  )
}

export default RoadMap;
