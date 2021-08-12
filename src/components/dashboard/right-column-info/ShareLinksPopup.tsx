import React from "react";
import { toast } from "react-toastify";
import { ReactComponent as Copy} from "../../../resources/svg/Copy.svg"

type ShareProps = {
  link: string,
  setURL: () => void,
}

function ShareLinksPopup({link, setURL} : ShareProps) {

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
    <div>
      <div className="fixed w-screen h-screen z-30 top-0 left-0" onClick={setURL} />
      <div className="flex items-center rounded-md absolute z-40 h-6 w-80 overflow-auto transform -translate-x-2/4 -translate-y-1/2 bg-gray-50 rounded-t-lg shadow">
        <div className="flex-grow flex-shrink">
          <form>
            <input 
              className="px-1 rounded-md w-full"
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
    </div>
  );
}

export default ShareLinksPopup;
