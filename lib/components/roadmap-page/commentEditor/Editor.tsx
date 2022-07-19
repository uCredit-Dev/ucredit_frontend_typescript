
import React, { useState } from "react";

interface Props {
  addComments: (newComment: string) => void;
}

const Editor: React.FC<Props> = (props) => {
  const addComments = props.addComments;
  const [text, setText] = useState("");

  return (
    <div className="z-50 bottom-0 absolute font-landingPage">
    <textarea
        value={text}
        className="shadow-slate-400 h-48 rounded-lg w-screen resize-none px-10 pt-8 text-xl"
        placeholder="comment here..."
        onChange={(e) => setText(e.target.value)}
        onFocus={function (e) {
          var val = e.target.value;
          e.target.value = "";
          e.target.value = val;
        }}
      />
    
    <button
      className="absolute bottom-8 left-10 bg-blue-footer text-blue-header text-lg sm:w-auto px-4 py-1 hover:text-blue-footer hover:bg-blue-header rounded-[20px] transition duration-100 ease-in"
      onClick={() => {
        addComments(text);
        setText("");
      }}
    >
      send
    </button>
  </div>
  )


}

export default Editor;