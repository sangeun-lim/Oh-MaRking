import { useState, useEffect } from 'react';
import { getProduct } from './api/index';
import reactLogo from './assets/react.svg';
import './App.css';
import './test.scss';

function App() {
  const [count, setCount] = useState(0);
  const apiTestPath = import.meta.env.VITE_API_TEST_PATH;

  useEffect(() => {
    getProduct(`https://dummyjson.com${apiTestPath}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [apiTestPath]);

  return (
    <div className="App">
      <div>
        <a href="https://www.naver.com">네이버</a>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount(() => count + 1)}>
          count is {count}
        </button>
        <div>
          {apiTestPath}
          Edit <code>src/App.tsx</code> and save to test HMR
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h2 className="yellow">TEST</h2>
    </div>
  );
}

export default App;
