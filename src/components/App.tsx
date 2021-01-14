import Header from './header/Header';
import Content from './body/Content';

function App() {
  return (
    <div 
      style={{display:'flex',
      flexFlow: 'column', 
      height:window.innerHeight
      }}>
      <Header />
      <Content />
    </div>
  );
}

export default App;
