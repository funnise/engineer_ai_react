import React from 'react';
import './App.css';
import { TopPage } from './components/TopPage';
import { JsonDataPage } from './components/JsonDataPage';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact={true} path='/' render={() => <TopPage/>}/>
        <Route  path='/jsonData' render={() => <JsonDataPage/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
