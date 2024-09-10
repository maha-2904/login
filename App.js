import logo from './logo.svg';
import './App.css';
import Counter from './count';
import Namechanger from './name';
import Timer from './useeffect';
import HelloWorld from './jsx';

function App() {
  return (
    <div className="App">
     <Counter/>
     <Namechanger/>
     <Timer/>
     <HelloWorld/>
    </div>
  );
}

export default App;
