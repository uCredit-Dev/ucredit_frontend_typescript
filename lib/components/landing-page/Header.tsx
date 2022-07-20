import { useRouter } from 'next/router';

/**
 * Header of landing page.
 */
const Header: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 h-1/6 bg-white">
      <div className="flex items-center">
        <img className="w-8 h-8 mr-2" src="/img/logo.png" alt="logo" />
        <div
          className="text-3xl italic font-bold cursor-pointer text-secondary"
          onClick={() => router.push('/login')}
        >
          uCredit
        </div>
      </div>
      <button
        className="px-2 py-0.5 hover:text-white hover:bg-black border border-gray-600 rounded-lg transition duration-100 ease-in"
        onClick={() => router.push('/login')}
      >
        Log in
      </button>
    </div>
  );
};

export default Header;

