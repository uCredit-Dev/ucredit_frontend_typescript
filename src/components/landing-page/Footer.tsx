import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <div className='text-sm text-center text-gray-600'>
      <p>uCredit © {new Date().getFullYear()}</p>
      <p>
        Made with <span>❤️&nbsp;</span> in Baltimore
      </p>
    </div>
  );
};

export default Footer;
