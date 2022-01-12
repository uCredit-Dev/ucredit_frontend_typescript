import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { store } from './appStore/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <Router>
    <React.StrictMode>
      <CookiesProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CookiesProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
