// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SubmittedSongs from './pages/SubmittedSongs';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/submitted-songs" element={<SubmittedSongs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
