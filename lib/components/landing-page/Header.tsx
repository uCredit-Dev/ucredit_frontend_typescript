import { useRouter } from 'next/router';
import { useState } from 'react';

const Links: React.FC = () => {
  const router = useRouter();

  return (
    <div className="sm:space-x-5">
      <button
        className="w-full sm:w-auto px-3 py-1 hover:text-blue-header hover:bg-blue-footer rounded-[13px] transition duration-100 ease-in"
        onClick={() => router.push('/about')}
      >
        About
      </button>

      <button
        className="w-full sm:w-auto px-3 py-1 hover:text-blue-header hover:bg-blue-footer rounded-[13px] transition duration-100 ease-in"
        onClick={() => router.push('/team')}
      >
        Team
      </button>

      <a href="https://ucredit-docs.herokuapp.com/">
        <button 
          className="w-full sm:w-auto px-3 py-1 hover:text-blue-header hover:bg-blue-footer rounded-[13px] transition duration-100 ease-in"
        >
          Docs
        </button>
      </a>

      <button
        className="w-full sm:w-auto px-3 py-1 text-blue-header bg-blue-footer border hover:text-blue-footer hover:bg-blue-header border-blue-footer rounded-[13px] transition duration-100 ease-in"
        onClick={() => router.push('/login')}
      >
        Log in
      </button>

    </div>
  )
}





/**
 * Header of landing page.
 */
const Header: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<Boolean>(false);




  return (
    <div className="sticky top-0 z-40 flex justify-between items-center py-1 px-4 h-1/6 bg-blue-header font-landingPage">
      <div className="flex-grow">
        
          <div className="inline-flex">
            <img className="w-12 h-12 mr-1 scale-x-[-1]" src="/img/logo.png" alt="logo" />
                
            <div
              className="text-2xl cursor-pointer text-blue-footer self-center"
              onClick={() => router.push('/login')}
            >
              uCredit
            </div>
          </div>
      
      </div>
      <div>

        <div className="relative sm:hidden">
          <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"
            onClick={() => setShowMenu(!showMenu)}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute w-20 top-12 space-y-1 right-0 z-100 bg-blue-header shadow-xl rounded-[13px]">
              <Links />
            </div>
          )}

        </div>


        <div className="hidden sm:block">
          <Links />
        </div>
      </div>

  
      
    </div>
  );
};


export default Header;
