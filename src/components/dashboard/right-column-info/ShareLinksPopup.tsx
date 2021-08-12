import React from "react";
import { toast } from "react-toastify";
import { ReactComponent as Copy} from "../../../resources/svg/Copy.svg"

type ShareProps = {
  link: string,
}

function ShareLinksPopup({link} : ShareProps) {

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(link)
    .then(() => {
      navigator.clipboard.writeText(link)
      .then(() => {
        toast.info("Copied to Clipboard!", {
          autoClose: 5000,
          closeOnClick: false,
        });
      })
    })
  }

  return (
    <div className="flex w-full items-center">
      <div className="flex-grow flex-shrink">
        <form>
          <input 
            className="w-full bg-gray-200 rounded-md"
            type="text" 
            name="shareLink" 
            value={link} 
            disabled={true} />
        </form>
      </div>
      <div className="h-6 w-6 cursor-pointer transform hover:scale-105 transition duration-200 ease-in" onClick={copyToClipBoard}>
        <Copy/>
      </div>
    </div>
  );
}

export default ShareLinksPopup;
