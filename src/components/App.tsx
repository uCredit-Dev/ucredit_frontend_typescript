import * as React from 'react';
import { useEffect } from 'react';
import Header from './header/Header';
import Content from './body/Content';
import { Counter } from '../redux_sample/Counter';
import { useDispatch } from 'react-redux';
import { login } from './slices/userSlice';
import { testUser } from './testObjs';

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // Get user
  //   dispatch(login(testUser));
  // }, []);
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
