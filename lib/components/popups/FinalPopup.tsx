import React from 'react';
import { FC } from 'react';

/**
 * Feedback form popup.
 * @prop setFormPopup - opens or closes feed back form popup
 */
const FinalPopup: FC<{ setFinalPopup: (value: boolean) => void }> = ({
    setFinalPopup,
}) => {
  return (
    <div>
      {/* Background Grey */}
      <div
        className="fixed z-50 left-0 top-0 m-0 w-full h-screen bg-black opacity-50"
        onClick={() => setFinalPopup(false)}
      ></div>

      {/* Popup */}
      <div
        className={
          'z-50 fixed flex flex-col bg-white select-none rounded h-2/3 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-w-planAdd overflow-auto'
        }
      >
        <div className="px-4 py-2 bg-primary text-white text-coursecard select-none">
          <div className="flex justify-between">
            <div>uCredit Discontinuation and Transition</div>
            <div onClick={() => setFinalPopup(false)} className='cursor-pointer'>X</div>
          </div>
        </div>
        <div className="px-4 py-3 w-full h-full text-coursecard select-none whitespace-pre-line">
          {
          `Dear uCredit users,\n\n
          We hope this message finds you well! We're reaching out today to share some news regarding the course planning system at JHU.\n
          Starting Fall 2024, the university will partner with a new course planning platform (TBA) that replaces Degree Audit. We believe this transition will greatly benefit students, providing a more user-friendly and comprehensive tool for planning your academic journey.\n
          In light of this decision, we wanted to inform you that uCredit will cease support starting April 26th. To facilitate a smooth transition for all users, we've implemented a new export feature that allows you to seamlessly transfer your plans from uCredit to an excel worksheet. Here is a demo:\n\n `
          }
          <a 
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            target="_blank" 
            rel="noreferrer" 
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          >
            Export plan feature demo
          </a>
          <div className='flex-col'>
            <div>
              {
              `\n\nWe want to express our sincere gratitude to each of you for using uCredit over the years. We are grateful to have been a part of your academic journey.  If you have any questions or concerns, please do not hesitate email us at `
              }
              <a href="mailto:ucreditdev@gmail.com" className="underline text-blue-600 hover:text-blue-800">ucreditdev@gmail.com</a>
              {
              `.\n
              Thank you for your understanding and cooperation during this time of change.\n
              Best regards,`
              }
            </div>
            <div className="inline-flex">
              <img
                className="w-12 h-12 mr-1 scale-x-[-1]"
                src="/img/logo.png"
                alt="logo"
              />
              <div className="text-xl text-blue-footer self-center">
                uCredit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPopup;
