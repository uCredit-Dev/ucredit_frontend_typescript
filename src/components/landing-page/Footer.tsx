import { FC } from 'react';

/**
 * Footer of landing page.
 */
const Footer: FC = () => {
  return (
    <div className="py-3 text-center text-gray-600 text-sm bg-gray-100">
      <p>uCredit © {new Date().getFullYear()}</p>
      <p>
        Made with <span>❤️&nbsp;</span> in Baltimore
      </p>
    </div>
  );
};

export default Footer;
