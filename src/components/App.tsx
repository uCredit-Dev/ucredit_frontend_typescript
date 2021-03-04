import * as React from 'react';
import { useEffect } from 'react';
import Header from './header/Header';
import Content from './body/Content';
import { Counter } from '../features/redux_sample/Counter';

function App() {
  useEffect(() => {
    // Get user
  });
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        height: window.innerHeight,
      }}
    >
      <Counter />
      <Header />
      <Content />
    </div>
  );
}

export default App;
