import { useRouter } from 'next/router';

const Links: React.FC = () => {
  const router = useRouter();

  return (
    <div className="space-x-5">
      <button
        className="px-3 py-1 hover:text-blue-header hover:bg-blue-footer rounded-[12px] transition duration-100 ease-in"
        onClick={() => router.push('/about')}
      >
        About
      </button>

      <button
        className="px-3 py-1 hover:text-blue-header hover:bg-blue-footer rounded-[12px] transition duration-100 ease-in"
        onClick={() => router.push('/team')}
      >
        Team
      </button>

      <button
        className="px-3 py-1 hover:text-blue-header hover:bg-blue-footer rounded-[12px] transition duration-100 ease-in"
        onClick={() => router.push('/docs')}
      >
        Docs
      </button>

      <button
        className="px-3 py-1 text-blue-header bg-blue-footer border hover:text-blue-footer hover:bg-blue-header border-blue-footer rounded-[12px] transition duration-100 ease-in"
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
        <Links />
      </div>
  
      
    </div>
  );
};


export default Header;
