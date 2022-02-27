import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { NextComponentType } from 'next';
import ReactTooltip from 'react-tooltip';
import { ToastContainer } from 'react-toastify';
import { store } from '../lib/appStore/store';
import '../lib/index.css';

const MyApp: React.FC<{
  Component: NextComponentType;
  pageProps: any;
}> = ({ Component, pageProps }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <>
      {isMounted && (
        <ReactTooltip
          id="godTip"
          html={true}
          className="max-w-sm"
          place="top"
          effect="solid"
          delayShow={250}
        />
      )}
      <CookiesProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </CookiesProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default MyApp;
