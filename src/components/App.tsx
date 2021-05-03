import * as React from "react";
import Header from "./header/Header";
import Content from "./body/Content";
import { ToastContainer } from "react-toastify";
//import { Counter } from '../redux_sample/Counter';

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* <Counter /> */}
      <Header />
      <Content />

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
