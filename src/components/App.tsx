import * as React from 'react';
import Header from './header/Header';
import Content from './body/Content';
//import { Counter } from '../redux_sample/Counter';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        height: window.innerHeight,
      }}
    >
      {/* <Counter /> */}
      <Header />
      <Content />
    </div>
  );
}

export default App;
