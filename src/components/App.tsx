import * as React from "react";
import Header from "./header/Header";
import Content from "./body/Content";
//import { Counter } from '../redux_sample/Counter';

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* <Counter /> */}
      <Header />
      <Content />
    </div>
  );
}

export default App;
