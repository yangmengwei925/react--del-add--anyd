import React from 'react';
import Home from './components/Home'
import './App.css';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css';
import store from './store'
import './mock'

function App() {
  return (
    <div className="App">
      <Provider store = { store }>
        <Home/>
      </Provider> 
    </div>
  );
}

export default App;
