import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { NextComponentType } from 'next';
import { ToastContainer } from 'react-toastify';
import { store } from '../lib/appStore/store';
import '../lib/index.css';
import 'react-tooltip/dist/react-tooltip.css';
import Head from 'next/head';
// import MobileTurnPage from '../lib/components/MobileTurnPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Or Create your Own theme:
const theme = createTheme();

const MyApp: React.FC<{
  Component: NextComponentType;
  pageProps: any;
}> = ({ Component, pageProps }) => {
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

  return (
    <>
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
              <meta name="keywords" content="ucredit, jhu, semesterly" />
              <meta
                name="google-site-verification"
                content="pvEeXuYCxF6NJiH_huGZMae_aKeTckqDrTB74w7FdF8"
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
