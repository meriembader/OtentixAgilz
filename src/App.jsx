import React from 'react';

import {BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './components/Home';
import WaletList from './components/waletList';

function App() {
  return (
    <BrowserRouter>
    <div className="pt-20">
 
      <Routes>
        <Route path="/"  element={<WaletList/>}  />
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
