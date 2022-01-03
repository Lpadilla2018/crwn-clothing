import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';


function App() {
  return (<div>
  <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/hats' element={<Hats/>}></Route>

  </Routes>

  </div>);
}

const Hats = () => (
  <div>
    Hats
  </div>
)

export default App;
