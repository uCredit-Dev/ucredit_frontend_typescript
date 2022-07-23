/**
 * Footer of landing page.
 */
const Footer: React.FC = () => {
  return (
    <div className="py-3 text-sm text-center text-gray-600 bg-gray-100">
      <p>uCredit © {new Date().getFullYear()}</p>
      <p>
        Made with <span>❤️&nbsp;</span> in Baltimore
      </p>
    </div>
  );
};

export default Footer;
