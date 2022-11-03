import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { NextComponentType } from 'next';
import ReactTooltip from 'react-tooltip';
import { ToastContainer } from 'react-toastify';
import { store } from '../lib/appStore/store';
import '../lib/index.css';
import Head from 'next/head';
// import MobileTurnPage from '../lib/components/MobileTurnPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Or Create your Own theme:
const theme = createTheme();

const MyApp: React.FC<{
  Component: NextComponentType;
  pageProps: any;
}> = ({ Component, pageProps }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const setDimension = () => {
    if (window) setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', setDimension);
      return () => {
        window.removeEventListener('resize', setDimension);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window, screenWidth]);

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
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Head>
              <link rel="shortcut icon" href="/static/favicon.ico" />
              <meta
                name="description"
                content="Quick accessible degree planning."
              />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            {/* {screenWidth < 474 ? (
            <MobileTurnPage />
          ) : ( */}
            <Component {...pageProps} />
            {/* )} */}
          </Provider>
        </ThemeProvider>
      </CookiesProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
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
